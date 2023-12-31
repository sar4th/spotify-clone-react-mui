import React, { useCallback, useState } from "react";
import { Box, Grid, IconButton, Typography, debounce } from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { SetplayListDetials } from "../redux/MusicSlice";
const cardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "8px",
  width: "180px",
  height: "250px",
  borderRadius: "8px",
  background: "linear-gradient(45deg, #6b6b6b, #2f2f2f)",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  justifyContent: "center",
};

const imageContainerStyle = {
  width: "100%",
  height: "70%",
  marginBottom: "8px",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const titleStyle = {
  color: "#FFFFFF",
  fontSize: "0.875rem",
  fontWeight: "700",
  textAlign: "center",
};

const descriptionStyle = {
  color: "#a7a7a7",
  fontSize: "0.75rem",
  fontWeight: "400",
  fontFamily: "sans-serif",
  textAlign: "center",
  lineHeight: 1.2,
};

const spotifyBadgeStyle = {
  position: "absolute",
  top: "4px",
  right: "4px",
  width: "20px",
  height: "20px",
};

const playButtonStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 1,
  zIndex: 1,
  transition: "opacity 0.2s ease-in-out",
};

const MusicCard = ({ img, title, description, playListId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePlay = (data) => {
    const id = data.playListId;

    if (id) {
      dispatch(SetplayListDetials(data));
      navigate("/player");
    }
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(
    debounce(() => {
      setHovered(true);
    }, 200), // Adjust the debounce duration (e.g., 200 milliseconds)
    []
  );

  const handleMouseLeave = useCallback(
    debounce(() => {
      setHovered(false);
    }, 200), // Adjust the debounce duration (e.g., 200 milliseconds)
    []
  );

  return (
    <Grid item md={2.3}>
      <Box
        style={cardContainerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box style={imageContainerStyle}>
          <img style={imageStyle} src={img} alt="img" />
          {hovered && (
            <IconButton
              style={{ ...playButtonStyle, opacity: 1 }}
              aria-label="play"
              onClick={() =>
                handlePlay({ playListId, img, description, title })
              }
              // onClick={()=>handlePlay(playListId)}
            >
              <PlayCircleFilledIcon
                sx={{ fontSize: "4rem", color: "#1DB954", fontWeight: "700" }}
              />
            </IconButton>
          )}
          <img
            style={spotifyBadgeStyle}
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="Spotify Badge"
          />
        </Box>
        <Typography style={titleStyle}>{title}</Typography>
        <Typography style={descriptionStyle}>{description}</Typography>
      </Box>
    </Grid>
  );
};

export default MusicCard;
