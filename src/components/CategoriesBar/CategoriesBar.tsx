import { useAppDispatch } from "@/store";
import {
  getPopularVideos,
  getVideosByCategory,
} from "@/store/actions/videos.action";
import React, { useState } from "react";

const keywords = ["Lil peep", "React js", "Next js", "Cuzknothz", "Hell"];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");
  const dispatch = useAppDispatch();
  const handleClick = (value: string) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };
  return (
    <div className="categoriesBar">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
