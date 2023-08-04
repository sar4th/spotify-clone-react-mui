import React, { useEffect, useState } from "react";
import "../styles/Footer.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

import { Grid, Slider } from "@mui/material";
import SpotifyWebApi from "spotify-web-api-js";
import { useDispatch, useSelector } from "react-redux";
import { setSongPlaying, setCurrentSong } from "../redux/MusicSlice"; // Update import

const MusicBar = () => {
  const dispatch = useDispatch();
  const songId = useSelector((state) => state.data.currentSong);
  const playlist = useSelector((state) => state.data.playListSongs); // Update playlist selector
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [trackInfo, setTrackInfo] = useState({
    data: {},
    image: "",
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Add currentSongIndex state

  const spotify = new SpotifyWebApi();

  useEffect(() => {
    const loadTrack = async () => {
      if (songId) {
        try {
          const response = await spotify.getTrack(songId);
          const audioUrl = response.preview_url;
          setTrackInfo({
            data: response,
            image: response.album.images[0]?.url || "",
          });
          dispatch(setSongPlaying(false));
          if (audioUrl) {
            if (audioPlayer) {
              audioPlayer.pause();
            }
            setAudioPlayer(new Audio(audioUrl));
            setIsPlaying(true);
          } else {
            console.error("Preview URL not available for this track.");
          }
        } catch (error) {
          console.error("Error loading track:", error);
        }
      }
    };
    loadTrack();
  }, [songId]);

  useEffect(() => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  }, [isPlaying, audioPlayer]);

  const togglePlay = () => {
    if (audioPlayer) {
      setIsPlaying((prevState) => !prevState);
    }
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length; // Circular navigation
    setCurrentSongIndex(nextIndex);
    dispatch(setCurrentSong(playlist[nextIndex].track.id)); // Update Redux state
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    dispatch(setCurrentSong(playlist[prevIndex].track.id)); // Update Redux state
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <div className="footer">
          <div className="footer__left">
            {trackInfo.image && (
              <img
                src={trackInfo.image}
                alt=""
                className="footer__albumLogo"
              />
            )}
            <div className="footer__songInfo">
              <h4>{trackInfo.data?.album?.name}</h4>
              <p>{trackInfo.data?.artists?.[0]?.name}</p>
            </div>
          </div>
          <div className="footer__center">
            <ShuffleIcon className="footer__green" />
            <SkipPreviousIcon
              className="footer__icon"
              onClick={playPreviousSong}
            />
            {isPlaying ? (
              <PauseCircleOutlineIcon
                fontSize="large"
                className="footer__icon"
                onClick={togglePlay}
              />
            ) : (
              <PlayCircleOutlineIcon
                fontSize="large"
                className="footer__icon"
                onClick={togglePlay}
              />
            )}
            <SkipNextIcon className="footer__icon" onClick={playNextSong} />
            <RepeatIcon className="footer__green" />
          </div>
          <div className="footer__right">
            <Grid container spacing={2}>
              <Grid item>
                <PlaylistPlayIcon />
              </Grid>
              <Grid item>
                <VolumeDownIcon />
              </Grid>
              <Grid item xs>
                <Slider />
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default MusicBar;
