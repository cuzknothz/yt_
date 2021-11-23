import { createSlice } from "@reduxjs/toolkit";

interface ChannelState {
  loading: boolean;
  channel: any;
  subscriptionStatus: false;
  err: string;
}

const initialState: ChannelState = {
  loading: true,
  channel: null,
  subscriptionStatus: false,
  err: "",
};
const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    CHANNEL_DETAILS_REQUEST: (state) => {
      state.loading = true;
    },
    CHANNEL_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.channel = action.payload;
    },
    CHANNEL_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.err = action.payload;
      state.channel = null;
    },
    SET_SUBSCRIPTION_STATUS: (state, action) => {
      state.subscriptionStatus = action.payload;
    },
  },
});

export const {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
  
} = channelSlice.actions;
export const channelDetailsReducer = channelSlice.reducer;
