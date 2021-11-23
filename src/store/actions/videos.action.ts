import {
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
} from "@/store/reducers/video";

import request from "@/api/axiosClient";
import { Dispatch } from "redux";

export const getPopularVideos =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: HOME_VIDEOS_REQUEST.toString(),
      });
      const { data } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "VN",
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
        },
      });

      dispatch({
        type: HOME_VIDEOS_SUCCESS.toString(),
        payload: {
          videos: data.items,
          nextPageToken: data.nextPageToken,
          category: "All",
        },
      });
    } catch (error: any) {
      console.log(error.message);
      dispatch({
        type: HOME_VIDEOS_FAIL.toString(),
        payload: error.message,
      });
    }
  };

export const getVideosByCategory =
  (keyword: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: HOME_VIDEOS_REQUEST.toString(),
      });
      const { data } = await request("/search", {
        params: {
          part: "snippet",

          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
          q: keyword,
          type: "video",
        },
      });

      dispatch({
        type: HOME_VIDEOS_SUCCESS.toString(),
        payload: {
          videos: data.items,
          nextPageToken: data.nextPageToken,
          category: keyword,
        },
      });
    } catch (error: any) {
      console.log(error.message);
      dispatch({
        type: HOME_VIDEOS_FAIL.toString(),
        payload: error.message,
      });
    }
  };

export const getVideoById = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST.toString(),
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEO_SUCCESS.toString(),
      payload: data.items[0],
    });
  } catch (error: any) {
    console.log(error.message);
    dispatch({
      type: SELECTED_VIDEO_FAIL.toString(),
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST.toString(),
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    dispatch({
      type: RELATED_VIDEO_SUCCESS.toString(),
      payload: data.items,
    });
  } catch (error: any) {
    console.log(error.response.data.message);
    dispatch({
      type: RELATED_VIDEO_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const getVideosBySearch =
  (keyword: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SEARCHED_VIDEO_REQUEST.toString(),
      });
      const { data } = await request("/search", {
        params: {
          part: "snippet",

          maxResults: 20,
          q: keyword,
          type: "video,channel",
        },
      });

      dispatch({
        type: SEARCHED_VIDEO_SUCCESS.toString(),
        payload: data.items,
      });
    } catch (error: any) {
      console.log(error.message);
      dispatch({
        type: SEARCHED_VIDEO_FAIL.toString(),
        payload: error.message,
      });
    }
  };

export const getSubscribedChannels =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SUBSCRIPTIONS_CHANNEL_REQUEST.toString(),
      });
      const { data } = await request("/subscriptions", {
        params: {
          part: "snippet,contentDetails",

          mine: true,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
      dispatch({
        type: SUBSCRIPTIONS_CHANNEL_SUCCESS.toString(),
        payload: data.items,
      });
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({
        type: SUBSCRIPTIONS_CHANNEL_FAIL.toString(),
        payload: error.response.data,
      });
    }
  };

export const getVideosByChannel = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST.toString(),
    });

    // 1. get upload playlist id
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });
    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;
    // 2. get the videos using the id
    const { data } = await request("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS.toString(),
      payload: data.items,
    });
  } catch (error: any) {
    console.log(error.response.data.message);
    dispatch({
      type: CHANNEL_VIDEOS_FAIL.toString(),
      payload: error.response.data,
    });
  }
};
