import { AnyMxRecord } from "dns";
import request from "@/api/axiosClient";
import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} from "@/store/reducers/comments.reducer";
import { Dispatch } from "redux";

export const getCommentsOfVideoById =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: COMMENT_LIST_REQUEST.toString(),
      });

      const { data } = await request("/commentThreads", {
        params: {
          part: "snippet",
          videoId: id,
        },
      });
      dispatch({
        type: COMMENT_LIST_SUCCESS.toString(),
        payload: data.items,
      });
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({
        type: COMMENT_LIST_FAIL.toString(),
        payload: error.response.data.message,
      });
    }
  };

export const addComment =
  (id: string, text: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const obj = {
        snippet: {
          videoId: id,
          topLevelComment: {
            snippet: {
              textOriginal: text,
            },
          },
        },
      };

      await request.post("/commentThreads", obj, {
        params: {
          part: "snippet",
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
      dispatch({
        type: CREATE_COMMENT_SUCCESS.toString(),
      });
      // @ts-ignore
      setTimeout(() => dispatch(getCommentsOfVideoById(id)), 3000);
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({
        type: CREATE_COMMENT_FAIL.toString(),
        payload: error.response.data.message,
      });
    }
  };
