import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid, Box as MuiBox } from "@mui/material";
import SideBarItem from "../components/SideBarItem";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylistSongs } from "../redux/MusicSlice";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import MusicPlayer from "./MusicPlayer";
import MusicBar from "./MusicBar";
import Recents from "./Recents";
import "../styles/styles.css";
import SongListCard from "./SongListCard";
const DRAWER_WIDTH = 340;

function Player(props) {
  const dispatch = useDispatch();
  const spotify = new SpotifyWebApi();
  const { playListId, title, description, img } = useSelector(
    (state) => state.data.playListDetials
  );

  const token = useSelector((state) => state.data.token);

  useEffect(() => {
    if (playListId) {
      spotify.getPlaylistTracks(playListId).then((response) => {
        dispatch(setPlaylistSongs(response.items));
      });
    }
  }, [playListId]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <Box>
        <SideBarItem />
      </Box>
      <Divider />
      {/* <SidebarSecondItem /> */}
      <Recents />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          overflow: "hidden",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            background: "black",
            padding: "8px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none", marginRight: "auto" } }}
          >
            <MenuIcon />
          </IconButton>
          {!token && (
            <MuiBox>
              <Button className="loginButton">Sign up</Button>
              <Button className="loginButton">Log in</Button>
            </MuiBox>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              background:"black"
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "340px",
              backgroundColor: "black",
              padding: "10px",
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          overflow: "hidden",
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          background: "#1a1a1a",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            {/* Render your SongListCard component */}
            <MusicPlayer />
          </Grid>
          <Grid item xs={12}>
            {/* Render your MyComponent component */}
            <SongListCard />
          </Grid>
        </Grid>

        <MusicBar />
      </Box>
    </Box>
  );
}

Player.propTypes = {
  window: PropTypes.func,
};

export default Player;
