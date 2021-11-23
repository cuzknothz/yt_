import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import Video from "@/components/Video/Video";
import CategoriesBar from "@/components/CategoriesBar/CategoriesBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "@/store/actions/videos.action";

import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "@/components/Skeletons/SkeletonVideo";
import { useAppDispatch, useAppSelector } from "@/store";

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useAppSelector(
    (state) => state.homeVideos
  );

  const fetchData = () => {
    if (activeCategory === "All") dispatch(getPopularVideos());
    else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container>
      <CategoriesBar />

      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      >
        {!loading
          ? //   @ts-ignore
            videos.map((video, idx) => (
              <div key={idx}>
                {/* @ts-ignore */}
                <Video video={video} key={video.id} />
              </div>
            ))
          : [...Array(20)].map((i, idx) => (
              <Col key={idx} lg={3} md={4}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
};
