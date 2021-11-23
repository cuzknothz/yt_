/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addComment,
  getCommentsOfVideoById,
} from "@/store/actions/comments.action";
import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import Image from "next/image";

const Comments: React.FC = ({ videoId, totalComments }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useAppSelector((state) => state.commentList.comments);

  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [text, setText] = useState("");

  const _comments = comments?.map(
    // @ts-ignore
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length === 0) return;

    dispatch(addComment(videoId, text));

    setText("");
  };
  return (
    <div className="w-[400px]">
      <p>{totalComments} Comments</p>
      {user.photoURL && (
        <div className="flex items-center">
          <div className="relative rounded-full w-[40px] h-[40px] overflow-hidden">
            <Image
              src={user.photoURL}
              alt="avatar"
              layout="fill"
              className="object-cover"
            />
          </div>
          <form onSubmit={handleComment} className="">
            <input
              type="text"
              className=""
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="">Comment</button>
          </form>
        </div>
      )}

      <div className="comments__list">
        {/* @ts-ignore */}
        {_comments?.map((comment, i) => (
          // @ts-ignore
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
