import { Grid, Typography } from "@mui/material";
import React from "react";

export const TitleCard = () => {
  return (
    <Grid item md={12}>
      <Typography
        sx={{
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "700",
          fontFamily: "'Circular Std', sans-serif",
          boxSizing: "border-box",
          letterSpacing: "0.00938em",
        }}
      >
        Spotify Playlist
      </Typography>
    </Grid>
  );
};
