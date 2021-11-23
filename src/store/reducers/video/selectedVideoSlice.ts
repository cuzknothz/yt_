import { createSlice } from "@reduxjs/toolkit";

const selectedVideoState = {
  loading: true,
  video: null,
  err: "",
};

const selectedVideoSlice = createSlice({
  name: "selectedVideo",
  initialState: selectedVideoState,
  reducers: {
    SELECTED_VIDEO_REQUEST: (state) => {
      state.loading = true;
    },
    SELECTED_VIDEO_SUCCESS: (state, action) => {
      state.video = action.payload;
      state.loading = false;
    },
    SELECTED_VIDEO_FAIL: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});
export const selectedVideoReducer = selectedVideoSlice.reducer;
export const {
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
} = selectedVideoSlice.actions;
