import { createSlice } from "@reduxjs/toolkit";

const subscriptionsChannelState = {
  loading: true,
  videos: [],
  err: "",
};
const subscriptionsChannelSlice = createSlice({
  name: "subscriptionChannel",
  initialState: subscriptionsChannelState,
  reducers: {
    SUBSCRIPTIONS_CHANNEL_REQUEST: (state) => {
      state.loading = true;
    },
    SUBSCRIPTIONS_CHANNEL_SUCCESS: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    SUBSCRIPTIONS_CHANNEL_FAIL: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});
export const subscriptionsChannelReducer = subscriptionsChannelSlice.reducer;
export const {
  SUBSCRIPTIONS_CHANNEL_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
} = subscriptionsChannelSlice.actions;
