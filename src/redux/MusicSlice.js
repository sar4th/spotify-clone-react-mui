import { createSlice } from "@reduxjs/toolkit";

const IntialState = {
  user: null,
  token: null,
  playlists: [],
  playListDetials: {},
  playListSongs: [],
  currentSong: null,
};
const dataSlice = createSlice({
  name: "data",
  initialState: IntialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    set_albums: (state, action) => {
      state.albums = action.payload;
    },
    set_user: (state, action) => {
      state.user = action.payload;
    },
    set_playlist: (state, action) => {
      state.playlists = action.payload;
    },
    set_discover_weekly: (state, action) => {
      state.discover_weekly = action.payload;
    },
    SetplayListDetials: (state, action) => {
      state.playListDetials = action.payload;
    },
    setPlaylistSongs: (state, action) => {
      state.playListSongs = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setSongPlaying: (state, action) => {
    state.songPlaying = action.payload;
    }
  },
});
export const {
  setToken,
  set_albums,
  set_user,
  set_playlist,
  set_discover_weekly,
  SetplayListDetials,
  setPlaylistSongs,
  setCurrentSong,
  setSongPlaying
} = dataSlice.actions;
export default dataSlice.reducer;
