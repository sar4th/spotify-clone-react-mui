import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import "../styles/styles.css"
const SideBarItem = () => {
  return (
    <>
      <Box
        sx={{ background: "#121212;", padding: "15px", borderRadius: "8px" }}
      >
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            textDecoration: "none",
            color: "white",
            fontSize: "1rem",
            fontWeight: 700,
          }}
        >
          <HomeIcon sx={{ marginRight: "10px" }} />
          <Link style={{ textDecoration: "none", color: "white" ,fontSize:"1rem", fontFamily: "'Circular Std', sans-serif"}} to={"/"}>
            {" "}
            <p>Home</p>
          </Link>
        </Link>
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            textDecoration: "none",
            color: "white",
            fontSize: "1rem",
            fontWeight: 700,
            fontFamily: "'Circular Std', sans-serif"
          }}
        >
          <SearchIcon
            sx={{ height: "24px", width: "24px", marginRight: "15px" }}
          />
          <p>Search</p>
        </Link>
      </Box>
    </>
  );
};

export default SideBarItem;
