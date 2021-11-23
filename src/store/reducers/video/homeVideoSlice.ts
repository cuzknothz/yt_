import { createSlice } from "@reduxjs/toolkit";

const homeVideoState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: "All",
  err: "",
};
const homeVideoSlice = createSlice({
  name: "homeVideo",
  initialState: homeVideoState,
  reducers: {
    HOME_VIDEOS_REQUEST: (state) => {
      state.loading = true;
    },
    HOME_VIDEOS_SUCCESS: (state, action) => {
      state.loading = false;
      state.nextPageToken = action.payload.nextPageToken;
      state.activeCategory = action.payload.category;
      // if (state.activeCategory === action.payload.category) {
      //   state.videos.concat(action.payload.videos);
      // } else {
      state.videos = action.payload.videos;
      // }
    },
    HOME_VIDEOS_FAIL: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});
export const homeVideosReducer = homeVideoSlice.reducer;
export const { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } =
  homeVideoSlice.actions;
