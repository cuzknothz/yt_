import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { useRouter } from "next/router";
import Comments from "../../components/Comments/Comments";
import VideoHorizontal from "../../components/VideoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/VideoMetaData/VideoMetaData";
import { getRelatedVideos, getVideoById } from "@/store/actions/videos.action";
import { useAppDispatch, useAppSelector } from "@/store";

const WatchScreen = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);
  const { videos, loading: relatedVideosLoading } = useAppSelector(
    (state) => state.relatedVideos
  );
  const { video, loading } = useAppSelector((state) => state.selectedVideo);
  return (
    <div className="flex justify-center bg-green-300 w-full">
      <div className="bg-black/20 md:w-[800px] w-full">
        <div className="w-full aspect-w-15 aspect-h-8 md:w-[800px]">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameBorder="0"
            //   @ts-ignore
            title={video?.snippet?.title}
            allowFullScreen
          ></iframe>
        </div>
        {!loading ? (
          <>{/* <VideoMetaData video={video} videoId={id} /> */}</>
        ) : (
          <h6>Loading...</h6>
        )}

        {/* <Comments
          //   @ts-ignore
          videoId={id}
          //   @ts-ignore
          totalComments={video?.statistics?.commentCount}
        /> */}
      </div>
      <div className="lg:w-[30px] hidden lg:block"></div>
      <div className="lg:block hidden">
        {!loading ? (
          videos
            //   @ts-ignore
            ?.filter((video) => video.snippet)
            //   @ts-ignore
            .map((video) => (
              //   @ts-ignore
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
        ) : (
          //   @ts-ignore
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </div>
    </div>
  );
};
export default WatchScreen;
