import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assests/spotify-logo-png.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SongListCard from "./SongListCard";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { setCurrentSong, setSongPlaying } from "../redux/MusicSlice";
const MusicPlayer = () => {
  const playlist=useSelector((state)=>state.data.playListSongs)
  const handlePlay = () => {
    if (playlist.length > 0) {
      const firstItemId = playlist[0].track.id;
      dispatch(setCurrentSong(firstItemId))
    } else {
      console.log("Playlist is empty.");
    }
  };

  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  if (playing) {
    dispatch(setSongPlaying(playing));
  }
  const playButtonStyle = {
    opacity: 1,
    zIndex: 1,
    transition: "opacity 0.2s ease-in-out",
  };
  const { playListId, title, description, img } = useSelector(
    (state) => state.data.playListDetials
  );

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          background: "linear-gradient(transparent, rgba(0, 0, 0, 1))",
          backgroundColor: "rgb(32,87,100)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "15px",
            gap: "3rem",
          }}
        >
          <Box sx={{ width: "192px", height: "192px" }}>
            <img style={{ width: "100%", height: "100%" }} src={img} alt="" />
          </Box>

          <Box>
            <Typography
              sx={{ fontSize: "0.8125rem", fontWeight: "700", color: "white" }}
            >
              {" "}
              Playlist
            </Typography>
            <Typography
              sx={{ fontWeight: "900", fontSize: "6rem", color: "white" }}
            >
              {title}
            </Typography>
            <Typography
              sx={{ fontSize: "0.8125rem", fontWeight: "700", color: "white" }}
            >
              {description}
            </Typography>
            <div>
              <img
                src={logo}
                alt=""
                style={{ height: "24px", width: "24px" }}
              />
              <Typography
                sx={{
                  fontSize: "0.8125rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                Spotify
              </Typography>
            </div>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: '20px' ,display:"flex"}}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: '0.8125rem !important',
                fontWeight: 400 ,
                color: 'white !important',
                fontFamily: "'Circular Std', sans-serif !important",
              }}
            >
              #
            </Typography>
            <Typography
              sx={{
                fontSize: '0.8125rem !important',
                fontWeight: 400,
                color: 'white',
                fontFamily: "'Circular Std', sans-serif !important",
              }}
            >
              Title
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontSize: '0.8125rem',
                fontWeight: 400,
                color: 'white',
                fontFamily: "'Circular Std', sans-serif",
              }}
            >
              Album
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <AccessTimeIcon
              sx={{ fontSize: '0.8125rem', fontWeight: 400, color: 'white' }}
            />
          </Grid>
        </Grid>
      </Box>
      {/* <SongListCard /> */}
    </>
  );
};

export default MusicPlayer;
