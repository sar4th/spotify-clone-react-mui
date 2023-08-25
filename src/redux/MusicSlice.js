import { createSlice } from "@reduxjs/toolkit";

const IntialState = {
  user: null,
  token: null,
  playlists: [],
  playListDetials: {},
  playListSongs: [],
  currentSong: null,
  setLoading: false,
  Playing: false,
  currentTime: 0,
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
      // console.log("SONGS",state.playListSongs);
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      // console.log("the current song",state.currentSong);
    },
    setSongPlaying: (state, action) => {
      state.songPlaying = action.payload;
    },
    setLoadings: (state, action) => {
      state.setLoading = action.payload;
    },
    setPlaying: (state, action) => {
      state.Playing = action.payload;
      // console.log("song is playing",state.Playing)
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },

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
  setSongPlaying,
  setLoadings,
  setPlaying,
  setCurrentTime
} = dataSlice.actions;
export default dataSlice.reducer;