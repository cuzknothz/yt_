import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth.reducer";
import { channelDetailsReducer } from "./channel.reducer";
import { commentListReducer } from "./comments.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  channelVideosReducer,
  homeVideosReducer,
  relatedVideoReducer,
  searchedVideosReducer,
  selectedVideoReducer,
  subscriptionsChannelReducer,
} from "@/store/reducers/video";
const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
  searchedVideos: searchedVideosReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  channelVideos: channelVideosReducer,
});
export default persistReducer(persistConfig, rootReducer);
