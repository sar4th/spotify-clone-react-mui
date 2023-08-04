import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import {
  SetplayListDetials,
  setPlaylistSongs,
  set_albums,
} from "../redux/MusicSlice";
import { Box, Button, Typography } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Recents = () => {
  const navigate = useNavigate();
  const token=useSelector((state)=>state.data.token)
useEffect(()=>{
  if(!token){
    navigate("/login")
     }
},[token])

  const spotify = new SpotifyWebApi();
  const dispatch = useDispatch();
  const albums = useSelector((state) => state?.data?.albums);

  useEffect(() => {
    if(token)
    spotify.getUserPlaylists().then((response) => {
      dispatch(set_albums(response?.items));
    });
  }, [token]);

  const handlePlay = (playListId) => {
    spotify.getPlaylist(playListId).then((response) => {
      const playlistDetails = {
        playListId: playListId,
        img: response?.images[0]?.url,
        title: response?.name,
        description: response?.description,
      };
      dispatch(SetplayListDetials(playlistDetails));
      navigate("/player");
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        padding: "10px",
        marginTop: "8px",
        height: "75vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          padding: "8px 16px",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" color="white" alignItems="center">
          <BookmarksIcon />
          <Typography sx={{ marginLeft: "15px", padding: "4px 8px" }}>
            Your Library
          </Typography>
        </Box>
        <Box sx={{ color: "white" }}>
          <AddIcon />
        </Box>
      </Box>
      <Box marginTop={3}>
        <Button
          sx={{
            borderRadius: "500px",
            color: "white",
            textTransform: "capitalize",
            fontSize: "0.8125rem",
            fontWeight: 400,
          }}
        >
          playlist
        </Button>
      </Box>
      <Box
        display="flex"
        color="white"
        justifyContent="space-between"
        padding={2}
      >
        <SearchIcon />
        <Typography fontWeight={400} fontSize="0.8125rem">
          Recent
        </Typography>
      </Box>
      <Box sx={{ padding: "16px" }}>
        {albums?.map((item) => (
          <Box
            key={item?.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            onClick={() => handlePlay(item?.id)}
          >
            <img
              style={{
                height: "48px",
                width: "48px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
              src={item?.images[0]?.url}
              alt=""
            />
            <Box>
              <Typography
                sx={{ color: "white", fontWeight: 400, fontSize: "1rem" }}
              >
                {item?.name}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                }}
              >
                Playlist .{item?.owner?.display_name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Recents;
