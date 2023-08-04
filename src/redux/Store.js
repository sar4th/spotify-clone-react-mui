import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./MusicSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
