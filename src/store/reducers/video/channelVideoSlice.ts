import { createSlice } from "@reduxjs/toolkit";

const channelVideoState = {
  loading: false,
  videos: [],
  err: "",
};
const channelVideoSlice = createSlice({
  name: "chanelVideo",
  initialState: channelVideoState,
  reducers: {
    CHANNEL_VIDEOS_REQUEST: (state) => {
      state.loading = true;
    },
    CHANNEL_VIDEOS_SUCCESS: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    CHANNEL_VIDEOS_FAIL: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const channelVideosReducer = channelVideoSlice.reducer;
export const {
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
} = channelVideoSlice.actions;
