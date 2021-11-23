/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React from "react";
import Image from "next/image";

const Comment = ({ comment }: any) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;

  return (
    <div className="flex my-4">
      {/* image section */}
      <div className="relative w-[40px] h-[40px] overflow-hidden rounded-full">
        <Image
          src={authorProfileImageUrl}
          alt="avatar"
          layout="fill"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col ml-3">
        <p className="text-sm">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="text-sm">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
