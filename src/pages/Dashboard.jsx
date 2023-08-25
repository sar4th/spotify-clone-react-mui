import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import SideBarItem from "../components/SideBarItem";
import MediaCard from "../components/MediaCard";
import Recents from "../components/Recents";
import { setToken } from "../redux/MusicSlice";
import { Music } from "../utils/Music";
import { TitleCard } from "../components/TitleCard";
import MusicBar from "../components/MusicBar";

const drawerWidth = 340;

function ResponsiveDrawer(props) {
  const isLoading = useSelector((state) => state.data.setLoading);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.data.token);
  const playlists = useSelector((state) => state.data.playlists);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const logout = () => {
    dispatch(setToken(""));
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const renderPlaylists = () => {
    return playlists.map((item) => (
      <div key={item.id}>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width={210}
            height={118}
            animation="wave"
          />
        ) : (
          <MediaCard
            img={item.images[0].url}
            description={item.description}
            title={item.name}
            playListId={item.id}
          />
        )}
      </div>
    ));
  };

  const renderTopMixes = () => {
    const topMixes = Music["Your top mixes"];
    return topMixes.map((item) => (
      <MediaCard
        key={item.title}
        img={item.img}
        description={item.description}
        title={item.title}
      />
    ));
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box></Box>
          {token ? (
            <Button
              onClick={() => logout()}
              className="loginbuttons"
              sx={{
                borderRadius: "500px",
                textTransform: "capitalize",
                color: "grey",
                background: "black",
                fontSize: "1rem",
                fontWeight: "700",
                padding: "7px",
                width: "100px",
                transition: "background-color 0.3s ease-in-out",
                wordSpacing: "1px",
                "&:hover": {
                  fontSize: "1.1rem",
                  color: "white",
                  border: "0px",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Box>
              <Button
                className="loginbuttons"
                sx={{
                  borderRadius: "500px",
                  textTransform: "capitalize",
                  color: "white",
                  background: "black",
                  fontSize: "1rem",
                  fontWeight: "700",
                  padding: "7px",
                  width: "100px",
                }}
              >
                Sign up
              </Button>
              <Button
                className="loginbuttons"
                sx={{
                  borderRadius: "500px",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "black",
                  background: "white",
                  padding: "7px",
                  width: "100px",
                }}
              >
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  Log in
                </Link>
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
              width: drawerWidth,
              background: "black",
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
          // p: 3,
          // padding:"3px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: "#1a1a1a;",
        }}
      >
        <Grid
          container
          display={"flex"}
          spacing={2}
          marginTop={"30px"}
          justifyContent={"center"}
          gap={"5px"}
        >
          <TitleCard />
          {renderPlaylists()}
        </Grid>

        {/* <Grid container display={"flex"} spacing={4} marginTop={"30px"}>
          {renderTopMixes()}
        </Grid> */}

        <MusicBar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
