import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Player from "./components/Player";
import { getTokenFromUrl } from "./utils/spotify";
import {
  setToken,
  set_discover_weekly,
  set_playlist,
  set_user,
} from "./redux/MusicSlice";

const spotify = new SpotifyWebApi();

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.data.token);

  useEffect(() => {
    const initializeSpotify = (_token) => {
      spotify.setAccessToken(_token);

      Promise.all([
        spotify.getMe(),
        spotify.getPlaylist("37i9dQZF1DWX3SoTqhs2rq"),
        spotify.getFeaturedPlaylists(),
        spotify.getPlaylistTracks("37i9dQZF1DWX3SoTqhs2rq"),
      ]).then(([user, discoverWeekly, playlists, playlistTracks]) => {
        dispatch(set_user(user));
        dispatch(set_discover_weekly(discoverWeekly));
        dispatch(set_playlist(playlists.playlists.items));
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
          <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
