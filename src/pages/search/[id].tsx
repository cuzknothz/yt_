import VideoHorizontal from "@/components/VideoHorizontal/VideoHorizontal";
import { useAppDispatch, useAppSelector } from "@/store";
import { getVideosBySearch } from "@/store/actions/videos.action";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SearchScreen = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(id));
  }, [id, dispatch]);

  const { videos, loading } = useAppSelector((state) => state.searchedVideos);

  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          // @ts-ignore
          <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
        ))
      ) : (
        // @ts-ignore
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};
export default SearchScreen;
