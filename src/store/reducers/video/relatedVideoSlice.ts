import { createSlice } from "@reduxjs/toolkit";

const relatedVideoState = {
  loading: true,
  videos: [],
  err: "",
};

const relatedVideoSlice = createSlice({
  name: "relatedVideo",
  initialState: relatedVideoState,
  reducers: {
    RELATED_VIDEO_REQUEST: (state) => {
      state.loading = true;
    },
    RELATED_VIDEO_SUCCESS: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    RELATED_VIDEO_FAIL: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const relatedVideoReducer = relatedVideoSlice.reducer;
export const {
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
} = relatedVideoSlice.actions;
