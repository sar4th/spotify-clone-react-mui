import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Player from "./components/Player";
import { getTokenFromUrl } from "./utils/spotify";
import {
  setLoadings,
  setToken,
  set_discover_weekly,
  set_playlist,
  set_user,
} from "./redux/MusicSlice";
import MusicBar from "./components/MusicBar";

const spotify = new SpotifyWebApi();

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.data.token);

  useEffect(() => {
    dispatch(setLoadings(true));

    const initializeSpotify = (_token) => {
      spotify.setAccessToken(_token);

      const fetchPlaylist = () => {
        setTimeout(() => {
          spotify
            .getPlaylist("37i9dQZF1DWX3SoTqhs2rq")
            .then((discoverWeekly) => {
              dispatch(set_discover_weekly(discoverWeekly));
              dispatch(setLoadings(false));
            });
        }, 2000); // Adjust the timeout duration (e.g., 5000 milliseconds)
      };

      Promise.all([
        spotify.getMe(),
        spotify.getFeaturedPlaylists(),
        spotify.getPlaylistTracks("37i9dQZF1DWX3SoTqhs2rq"),
      ]).then(([user, playlists, playlistTracks]) => {
        dispatch(set_user(user));
        dispatch(set_playlist(playlists.playlists.items));
        fetchPlaylist();
      });
    };

    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch(setToken(_token));
      initializeSpotify(_token);
    }
  }, [dispatch]);

  return (
    <div className="app" style={{ padding: "0", margin: "0" }}>
      <Router>
        <Routes>
          <Route path="/" element={token ? <Dashboard /> : <Login />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Login />}
          />
          <Route path="/player" element={<Player />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      {token && <MusicBar />}
    </div>
  );
}

export default App;
