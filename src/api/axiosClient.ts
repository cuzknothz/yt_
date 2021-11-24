import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyBnTmhe4kjG5ixLB0v0YiNI7wHiuACOD4s",
  },
});

export default request;
