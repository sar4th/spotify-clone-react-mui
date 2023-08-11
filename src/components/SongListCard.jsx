import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";
import { setCurrentSong, setPlaying } from "../redux/MusicSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const SongListCard = () => {
  const playing = useSelector((state) => state.data.Playing);
  console.log("Playing", playing);
  const dispatch = useDispatch();

  const handleSongClick = (songID) => {
    dispatch(setCurrentSong(songID));
  };

  const songs = useSelector((state) => state.data.playListSongs);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Create a separate state for tracking the logo toggle for each song
  const [logoToggles, setLogoToggles] = useState(songs.map(() => false));

  const toggleLogo = (index) => {
    // Toggle the logo state
    setLogoToggles((prevToggles) => {
      const newToggles = [...prevToggles];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });

    // Toggle the playing state
    dispatch(setPlaying(!playing));
  };

    // Toggle music play and pause based on playing state
  //   if (!playing) {
  //     dispatch(setPlaying(true));
  //   } else {
  //     dispatch(setPlaying(false));
  //   }
  // };

  return (
    <Box>
      {songs.map((song, index) => (
        <Box
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          key={index}
          sx={{
            ...songBoxStyle,
          }}

        >
          <Box sx={indexBoxStyle} onClick={() => toggleLogo(index)}>
            {hoveredIndex === index ? (
              <IconButton>
                {logoToggles[index] ? (
                  <img
                    src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
                    alt=""
                  />
                ) : (
                  <PlayArrowIcon sx={{ color: "white" }} />
                )}
              </IconButton>
            ) : (
              <Typography variant="body2">{index + 1}</Typography>
            )}
          </Box>
          <Box sx={songInfoStyle}   onClick={() => handleSongClick(song.track.id)}>
            <img
              style={songImageStyle}
              src={song?.track?.album?.images[0]?.url}
              alt="Song"
            />
            <Typography className="songList" sx={songNameStyle}>
              {song?.track?.name}
            </Typography>
          </Box>
          <Box sx={albumInfoStyle}>
            <Typography sx={albumNameStyle}>
              {song?.track?.album?.name}
            </Typography>
          </Box>
          <Box sx={{ ...favoriteIconStyle, transition: "color 0.3s ease" }}>
            {hoveredIndex && (
              <FavoriteBorderIcon
                sx={{
                  color: hoveredIndex === index ? "white" : "transparent",
                  fontSize: "0.875rem",
                  transition: "color 0.3s ease",
                }}
              />
            )}
          </Box>
          <Box sx={durationStyle}>
            <Typography sx={durationTextStyle}>
              {formatDuration(song?.track?.duration_ms)}
            </Typography>
          </Box>
          <Box>
            {hoveredIndex && (
              <Box sx={{ ...horizonIconStyle, transition: "color 0.3s ease" }}>
                {
                  <MoreHorizIcon
                    sx={{
                      color: hoveredIndex === index ? "white" : "transparent",
                      transition: "color 0.3s ease",
                    }}
                  />
                }
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Styles
const songBoxStyle = {
  display: "flex",
  maxWidth: "100%",
  alignItems: "center",
  marginBottom: "15px",
  cursor: "pointer",
  padding: "5px",
  justifyContent: "center",
  borderRadius: "4px",
  gap: "5px",
  transition: "background-color 0.5s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

const indexBoxStyle = {
  fontWeight: "400",
  color: "white",
  // flex: "0 0 10%",
  dispatch: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
  width: "40px",
  height: "40px",
  display: "flex",
};
const songInfoStyle = {
  width: "40%",
  paddingLeft: "5px",
  flex: "0 0 40%",
  display: "flex",
  alignItems: "center",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const songImageStyle = {
  height: "35px",
  width: "35px",
  marginRight: "10px",
  padding: "8px",
};

const songNameStyle = {
  color: "white",
  fontSize: "1rem",
  fontWeight: "400",
  fontFamily: "'Circular Std', sans-serif",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};
const albumInfoStyle = {
  width: "30%",
  paddingLeft: "10px",
  flex: "0 0 30%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const albumNameStyle = {
  color: "white",
  fontSize: "0.8125rem",
  fontWeight: "400",
  fontFamily: "'Circular Std', sans-serif",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};
const durationStyle = {
  width: "10%",
  textAlign: "center",
  flex: "0 0 10%",
};

const durationTextStyle = {
  fontSize: "0.8125rem",
  fontWeight: "400",
  color: "white",
};
const favoriteIconStyle = {
  width: "25px",
  height: "25px",
  color: "transparent",
};
const horizonIconStyle = {
  dispatch: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "10px",
  color: "transparent",
};
export default SongListCard;
