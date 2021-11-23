import React, { useEffect, useState } from "react";

import { AiFillEye } from "react-icons/ai";
import request from "@/api/axiosClient";
import Image from "next/image";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useRouter } from "next/router";

const Video = ({ video, channelScreen }: any) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || contentDetails?.videoId || id;
  const router = useRouter();

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [_videoId]);

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

  const handleVideoClick = () => {
    router.push(`/watch/${_videoId}`);
  };

  return (
    <div className="" onClick={handleVideoClick}>
      <div>
        {/* <img src={medium.url} alt='' /> */}
        <div className="relative w-[300px] h-[150px] bg-black">
          {/* picture preview */}
          <Image
            src={medium.url}
            layout="fill"
            alt=""
            className="object-cover rounded-full"
          />
          {/* duration time */}
          <p className="absolute bottom-0 right-0 bg-black/50">{_duration}</p>
        </div>
        {/* <LazyLoadImage src={medium.url} effect="blur" /> */}
      </div>
      {/* title */}
      <p className="text-sm">{title}</p>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •{" "}
        </span>{" "}
        <span> {moment(publishedAt).fromNow()} </span>
      </div>
      {!channelScreen && (
        <div className="video__channel">
          {/* @ts-ignore */}
          <LazyLoadImage src={channelIcon?.url} effect="blur" />

          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
