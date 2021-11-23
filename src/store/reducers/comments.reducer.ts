import { createSlice } from "@reduxjs/toolkit";

interface CommentState {
  loading: boolean;
  comments: any;
  err: string;
}

const initialState: CommentState = {
  loading: true,
  comments: null,
  err: "",
};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    COMMENT_LIST_REQUEST: (state) => {
      state.loading = true;
    },
    COMMENT_LIST_SUCCESS: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    COMMENT_LIST_FAIL: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    CREATE_COMMENT_FAIL: (state, action) => {},
    CREATE_COMMENT_SUCCESS: (state, action) => {},
  },
});

export const {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} = commentSlice.actions;
export const commentListReducer = commentSlice.reducer;
