import React, { useEffect, useState } from "react";

import { AiFillEye } from "react-icons/ai";
import request from "@/api/axiosClient";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";

import { useRouter } from "next/router";
import Image from "next/image";

const VideoHorizontal = ({ video, searchScreen, subScreen }: any) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;
  const router = useRouter();
  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (isVideo) get_video_details();
  }, [id, isVideo]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const _channelId = resourceId?.channelId || channelId;
  const handleClick = () => {
    isVideo
      ? router.push(`/watch/${id.videoId}`)
      : router.push(`/channel/${_channelId}`);
  };
  const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel";
  return (
    <div className="bg-black/20 group w-[250px]" onClick={handleClick}>
      <div>
        <div className="relative w-[250px] h-[125px] md:cursor-pointer">
          <Image
            src={medium.url}
            alt=""
            layout="fill"
            className="object-cover"
          />
          <p className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 group-hover:block hidden">
            Play
          </p>
          <div className="absolute hidden group-hover:block inset-0 bg-black/50"></div>
          {isVideo && (
            <p className="absolute bottom-[3px] right-[5px] text-white text-sm">
              {_duration}
            </p>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="!w-[40px] mt-[5px] mr-2 !h-[40px] rounded-full overflow-hidden relative py-2">
          <Image
            //  @ts-ignore
            src={`${channelIcon?.url ?? "https://picsum.photos/200/300"}`}
            className="object-cover"
            alt=""
            layout="fill"
          />
        </div>
        <div>
          <p className="text-sm  w-[250px]">{title}</p>
          <p className="mb-0 text-sm md:cursor-pointer">{channelTitle}</p>
          {isVideo && (
            <div className="flex items-center">
              <AiFillEye />
              <p className="text-sm">
                {numeral(views).format("0.a")} Views •
                {moment(publishedAt).fromNow()}
              </p>
            </div>
          )}
        </div>
        {(searchScreen || subScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}
        <div className="my-1 videoHorizontal__channel d-flex align-items-center"></div>
        {subScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )}
      </div>
    </div>
  );
};

export default VideoHorizontal;
