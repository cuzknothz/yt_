import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: process.env.NEXT_PUBLIC_YT_API_KEY,
  },
});

export default request;
