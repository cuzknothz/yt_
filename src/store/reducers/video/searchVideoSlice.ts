import { createSlice } from "@reduxjs/toolkit";

const searchVideoState = {
  loading: true,
  videos: [],
  err: "",
};
const searchVideoSlice = createSlice({
  name: "searchVideo",
  initialState: searchVideoState,
  reducers: {
    SEARCHED_VIDEO_REQUEST: (state) => {
      state.loading = true;
    },
    SEARCHED_VIDEO_SUCCESS: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    SEARCHED_VIDEO_FAIL: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const searchedVideosReducer = searchVideoSlice.reducer;
export const {
  SEARCHED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
} = searchVideoSlice.actions;
