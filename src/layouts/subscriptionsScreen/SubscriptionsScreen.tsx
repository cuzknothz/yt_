import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import VideoHorizontal from "../../components/VideoHorizontal/VideoHorizontal";
import { getSubscribedChannels } from "@/store/actions/videos.action";


export const SubscriptionsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);
  //   @ts-ignore
  const { loading, videos } = useSelector(
    //   @ts-ignore
    (state) => state.subscriptionsChannel
  );

  return (
    <Container fluid>
      {!loading ? (
        videos?.map((video: any) => (
          //   @ts-ignore
          <VideoHorizontal video={video} key={video.id} subScreen />
        ))
      ) : (
        //   @ts-ignore
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};
