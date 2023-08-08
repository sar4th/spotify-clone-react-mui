import { Box, Button, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from "@mui/icons-material/Add";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import React from "react";
import "../styles/styles.css"
const SidebarSecondItem = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a;",
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
        <Box display={"flex"} color={"white"}>
          <BookmarksIcon />
          <Typography className="loginbuttons" sx={{ marginLeft: "15px", padding: "4px 8px",fontWeight:"700 !important",fontFamily:"Circular Std', sans-serif !important",fontSize:"1rem" }}>
            Your Library
          </Typography>
        </Box>
        <Box>
          <AddIcon />
        </Box>
      </Box>
      <Box
        sx={{
          padding: "16px 20px",
          backgroundColor: "#242424",
          borderRadius: "8px",
          width: "95%",
          marginLeft: "5px",
        }}
      >
        <Typography sx={{ fontSize: "1rem", fontWeight: "700" }}>
          Create your first playlist
        </Typography>
        <Typography
          sx={{ fontSize: "0.8125rem", fontWeight: "400", marginTop: "10px" }}
        >
          Its easy ,we'll help you
        </Typography>
        <Button
          className="loginbuttons"
          sx={{
            borderRadius: "500px",
            textTransform: "capitalize",
            color: "black",
            backgroundColor: "white",
            fontSize: "0.8125rem;",
            fontWeight: "700",
            padding: "7px",
            marginTop: "10px",
          }}
        >
          Create Playlist
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        padding={"10px"}
        justifyContent={"space-evenly"}
      >
        <Box>
          <Typography sx={{ fontSize: "0.6875rem", fontWeight: "400" }}>
            Legal
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "0.6875rem", fontWeight: "400" }}>
            Privacy Center
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "0.6875rem", fontWeight: "400" }}>
            Privacy Policy
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "0.6875rem", fontWeight: "400" }}>
            Cookies
          </Typography>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        padding={"10px"}
        // justifyContent={"space-evenl"}
        alignItems={"flex-start"}
      >
        <Box>
          <Typography sx={{ fontSize: "0.6875rem", fontWeight: "400" }}>
            About Ads
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "0.6875rem", fontWeight: "400" }}>
            Accessibility
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: "0.6875rem", fontWeight: "400", marginLeft: "10px" }}
        >
          Cookies
        </Typography>
      </Box>
      <Box marginTop={"20px"}>
        <Button
          sx={{
            borderRadius: "500px",
            color: "white",
            fontFamily: "Circular Std, sans-serif",
            fontWeight: "700",
            textTransform: "capitalize",
            fontSize: "0.8125rem",
          }}
          variant="outlined"
          startIcon={<LanguageIcon />}
        >
          English
        </Button>
      </Box>
    </Box>
  );
};

export default SidebarSecondItem;
