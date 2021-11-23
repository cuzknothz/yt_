import React, { useEffect, useState } from "react";
import HomeIcon from "@/assets/svgs/youtube.svg";
import { motion } from "framer-motion";
import { appRoutes } from "@/routes";
import Link from "next/link";
import { useAppDispatch } from "@/store";
import { getVideosBySearch } from "@/store/actions/videos.action";
import { useRouter } from "next/router";

const headerVariants = {
  hidden: {
    y: "-100%",
  },
  visible: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

export const Header: React.FC = () => {
  const [isScrollUp, setIsScrollUp] = useState("up");
  const router = useRouter();
  const [keywordSearch, setKeyWordSearch] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${keywordSearch}`);
  };
  useEffect(() => {
    // const handleWheel = (e: WheelEvent) => {
    //   // @ts-ignore
    //   console.log(e.wheelDeltaY);
    //   // @ts-ignore
    //   if (e.wheelDeltaY > 0) {
    //     setIsScrollUp("up");
    //   }
    //   // @ts-ignore
    //   if (e.wheelDeltaY < 0) {
    //     setIsScrollUp("down");
    //   }
    // };
    // window.addEventListener("wheel", handleWheel);
    var lastScrollTop = 0;
    const handleScrollMobile = (e: any) => {
      // @ts-ignore
      var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > lastScrollTop) {
        // downscroll code
        setIsScrollUp("down");
      } else {
        // upscroll code
        setIsScrollUp("up");
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    };
    window.addEventListener("scroll", handleScrollMobile, false);
  }, []);
  return (
    <>
      {isScrollUp === "up" && (
        <div className="">
          <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="w-full bg-white h-[45px] border-b-[1px] border-black/20 grid grid-cols-2 md:grid-cols-3 fixed top-0 z-30"
          >
            {/* logo */}
            <div className="h-full flex items-center">
              <div className="w-[45px] cursor-pointer">
                <Link href={appRoutes.home} passHref>
                  <HomeIcon />
                </Link>
              </div>
            </div>
            {/* Search */}
            <div className="h-full md:block hidden">
              <form
                onSubmit={handleSubmitForm}
                className="w-full h-full flex justify-center items-center"
              >
                <input
                  value={keywordSearch}
                  onChange={(e) => setKeyWordSearch(e.target.value)}
                  type="text"
                  className="text-sm focus:outline-none border-[1px] border-black/20 w-[300px] py-[4px] px-[25px]"
                  placeholder="Search"
                />
              </form>
            </div>
            {/* right section */}
            <div className="h-full flex items-center justify-end space-x-5">
              <div className="w-[45px]">
                <HomeIcon />
              </div>
              <div className="w-[45px]">
                <HomeIcon />
              </div>
              <div className="w-[45px]">
                <HomeIcon />
              </div>
            </div>
          </motion.header>
        </div>
      )}
    </>
  );
};
