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
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Box, Grid, Slider, Typography } from "@mui/material";
import SpotifyWebApi from "spotify-web-api-js";
import { useDispatch, useSelector } from "react-redux";
import {
  setSongPlaying,
  setCurrentSong,
  setPlaying,
} from "../redux/MusicSlice";

const MusicBar = () => {
  const dispatch = useDispatch();
  const songId = useSelector((state) => state.data.currentSong);
  const playlist = useSelector((state) => state.data.playListSongs);
  const playing = useSelector((state) => state.data.Playing);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [volIcon, setVolumeIcon] = useState(true);
  const [trackInfo, setTrackInfo] = useState({
    data: {},
    image: "",
  });
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);

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
              audioPlayer.src = audioUrl; // Set new audio source
            } else {
              setAudioPlayer(new Audio(audioUrl));
            }
            if (playing) {
              audioPlayer.play().catch((error) => {
                console.error("Error playing audio:", error);
              });
            }
          } else {
            console.error("Preview URL not available for this track.");
          }
        } catch (error) {
          console.error("Error loading track:", error);
        }
      }
    };
    loadTrack();
  }, [songId, audioPlayer, dispatch, playing]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.volume = volume;
      if (playing) {
        audioPlayer.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioPlayer.pause();
      }
    }
  }, [audioPlayer, volume, playing]);

  const togglePlay = () => {
    if (audioPlayer) {
      if (playing) {
        audioPlayer.pause();
      } else {
        audioPlayer.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      dispatch(setPlaying(!playing));
    }
  };
  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    dispatch(setCurrentSong(playlist[nextIndex].track.id));
  };

  const playPreviousSong = () => {
    const prevIndex =
      (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    dispatch(setCurrentSong(playlist[prevIndex].track.id));
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };
  const handleMute = () => {
    if (audioPlayer) {
      audioPlayer.muted = !audioPlayer.muted;
      setVolumeIcon(!audioPlayer.muted);
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bottom: 0,
        height: "104px",
        width: "100%",
        backgroundColor: "black",
        padding: "20px",
        zIndex: 1000,
        "@media screen and (min-width: 1000px)": {
          height: "34px",
        },
      }}
    >
      <Grid container alignItems="center" justifyContent={"flex-start"}>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: 300,
              padding: "2px",
            }}
          >
            {trackInfo.image && (
              <img
                src={trackInfo.image}
                alt=""
                style={{
                  height: 60,
                  width: 60,
                  marginRight: 20,
                  objectFit: "contain",
                }}
              />
            )}
            <div style={{ padding: "5px" }}>
              <Typography
                // variant="h4"
                sx={{ marginBottom: 1, color: "white", fontSize: "10px" }}
              >
                {trackInfo.data?.album?.name}
              </Typography>
              <Typography
                // variant="body2"
                sx={{ fontSize: 12, color: "white" }}
              >
                {trackInfo.data?.artists?.[0]?.name}
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // padding: "30px",
              color: "white",
              maxWidth: 300,
            }}
          >
            <ShuffleIcon sx={{ color: "#1ed15e", cursor: "pointer" }} />
            <SkipPreviousIcon
              sx={{ color: "white", cursor: "pointer" }}
              onClick={playPreviousSong}
            />
            {playing ? (
              <PauseCircleOutlineIcon
                fontSize="large"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "2.5rem",
                }}
                onClick={togglePlay}
              />
            ) : (
              <PlayCircleOutlineIcon
                fontSize="large"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "2.5rem",
                }}
                onClick={togglePlay}
              />
            )}
            <SkipNextIcon
              sx={{ color: "white", cursor: "pointer" }}
              onClick={playNextSong}
            />
            <RepeatIcon sx={{ color: "#1ed15e", cursor: "pointer" }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              color: "white",
              "@media screen and (max-width: 1000px)": {
                width: "260px",
              },
            }}
          >
            <PlaylistPlayIcon sx={{ cursor: "pointer" }} />
            <div onClick={() => handleMute()} sx={{ cursor: "pointer" }}>
              {volIcon ? (
                <VolumeDownIcon />
              ) : (
                <VolumeOffIcon sx={{ fontSize: "1.3rem" }} />
              )}
            </div>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.01}
              aria-label="Volume slider"
              sx={{
                color: "white",
                "&:hover": {
                  color: "#1ed15e",
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MusicBar;
