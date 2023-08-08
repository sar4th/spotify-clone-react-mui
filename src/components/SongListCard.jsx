import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { setCurrentSong } from "../redux/MusicSlice";

const SongListCard = () => {
  const dispatch = useDispatch();

  const handleSongClick = (songID) => {
    dispatch(setCurrentSong(songID));
  };

  const songs = useSelector((state) => state.data.playListSongs);

  return (
    <Box>
      {songs.map((song, index) => (
        <Box
          key={index}
          sx={{
            ...songBoxStyle,
          }}
          onClick={() => handleSongClick(song.track.id)}
        >
          <Box sx={indexBoxStyle}>
            <Typography variant="body2">{index + 1}</Typography>
          </Box>
          <Box sx={songInfoStyle}>
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
          <Box sx={durationStyle}>
            <Typography sx={durationTextStyle}>
              {formatDuration(song?.track?.duration_ms)}
            </Typography>
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
  alignItems: "center",
  marginBottom: "15px",
  cursor: "pointer",
  padding: "0 0 0 5px",
  justifyContent: "center",
  borderRadius: "4px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

const indexBoxStyle = {
  fontWeight: "400",
  color: "white",
  // flex: "0 0 10%",
  dispatch: "flex",
  justifyContent: "space-around",
};
const songInfoStyle = {
  width: "40%",
  paddingLeft: "5px",
  flex: "0 0 40%",
  display: "flex",
  alignItems: "center",
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const songImageStyle = {
  height: "40px",
  width: "40px",
  marginRight: "10px",
};

const songNameStyle = {
  color: "white",
  fontSize: "1rem",
  fontWeight: "400",
  fontFamily: "'Circular Std', sans-serif",
  textOverflow: "ellipsis",
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};
const albumInfoStyle = {
  width: "30%",
  paddingLeft: "10px",
  flex: "0 0 30%",
  textOverflow: "ellipsis",
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};


const albumNameStyle = {
  color: "white",
  fontSize: "0.8125rem",
  fontWeight: "400",
  fontFamily: "'Circular Std', sans-serif",
  textOverflow: "ellipsis",
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};
const durationStyle = {
  width: "20%",
  textAlign: "right",
  flex: "0 0 20%",
};

const durationTextStyle = {
  fontSize: "0.8125rem",
  fontWeight: "400",
  color: "white",
};

export default SongListCard;
