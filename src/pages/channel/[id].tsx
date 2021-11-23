/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Video from "../../components/Video/Video";
import { getChannelDetails } from "@/store/actions/channel.action";
import { getVideosByChannel } from "@/store/actions/videos.action";
import numeral from "numeral";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store";

const ChannelScreen = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getVideosByChannel(id));
    dispatch(getChannelDetails(id));
  }, [dispatch, id]);
  const { videos, loading } = useAppSelector((state) => state.channelVideos);
  const { snippet, statistics } = useAppSelector(
    (state) => state.channelDetails.channel
  );

  return (
    <>
      <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center">
          <img src={snippet?.thumbnails?.default?.url} alt="" />

          <div className="ml-3 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} subscribers
            </span>
          </div>
        </div>

        <button>Subscribe</button>
      </div>

      <Container>
        <Row className="mt-2">
          {!loading
            ? videos?.map((video: any, idx: any) => (
                <Col key={idx} md={3} lg={3}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(15)].map((i, idx) => (
                <Col key={idx} md={3} lg={3}>
                  {/* @ts-ignore */}
                  <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                    {/* // @ts-ignore */}
                    <Skeleton width="100%" height="140px" />
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
