import { createSlice } from "@reduxjs/toolkit";
interface AuthState {
  accessToken: string | null;
  user: any;
  err: string | null;
  loading: boolean;
}
const initialState: AuthState = {
  accessToken: null,
  user: null,
  err: null,
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN_REQUEST: (state) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.accessToken = action.payload;
      state.loading = false;
    },
    LOGIN_FAIL: (state, action) => {
      state.accessToken = null;
      state.loading = false;
      state.err = action.payload;
    },
    LOAD_PROFILE: (state, action) => {
      state.user = action.payload;
    },
    LOG_OUT: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOG_OUT,
  LOGIN_SUCCESS,
} = authSlice.actions;
