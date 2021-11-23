import request from "@/api/axiosClient";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "@/store/reducers/channel.reducer";
import { Dispatch } from "redux";

export const getChannelDetails = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST.toString(),
    });

    const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    });
    dispatch({
      type: CHANNEL_DETAILS_SUCCESS.toString(),
      payload: data.items[0],
    });
  } catch (error: any) {
    console.log(error.response.data);
    dispatch({
      type: CHANNEL_DETAILS_FAIL.toString(),
      payload: error.response.data,
    });
  }
};

export const checkSubscriptionStatus =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const { data } = await request("/subscriptions", {
        params: {
          part: "snippet",
          forChannelId: id,
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
      dispatch({
        type: SET_SUBSCRIPTION_STATUS.toString(),
        payload: data.items.length !== 0,
      });
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
