import React from "react";

import YoutubeIcon from "@/assets/svgs/youtube.svg";
import Link from "next/link";
import { appRoutes } from "@/routes";
import HomeIcon from "@/assets/svgs/home.svg";

import { SearchIcon } from "@heroicons/react/outline";

export const Header: React.FC = () => {
  return (
    <>
      <div className="w-full md:grid md:grid-cols-3 flex h-[50px] md:border-b-[1px] md:border-t-[0px] border-black/20 border-t-[1px] shadow-md fixed md:top-0 bottom-0">
        {/* left section */}
        <div className="ml-[25px] w-[45px] h-full md:flex justify-center items-center hidden cursor-pointer">
          <Link href={appRoutes.home} passHref>
            <YoutubeIcon />
          </Link>
        </div>
        {/* search section */}
        <div className="md:flex h-full justify-center items-center hidden">
          <form className="w-[300px] h-full flex justify-center items-center relative">
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none text-sm w-full px-[35px] py-[5px] border-[1px] border-black/20"
            />
            <button
              type="submit"
              className="absolute top-1/2 transform -translate-y-1/2 right-[15px] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
        {/* right section */}
        <nav className="w-full items-center h-full">
          <ul className="flex md:mr-[25px] md:justify-end md:space-x-5 justify-evenly items-center h-full">
            <li>
              <Link href={appRoutes.home} passHref>
                <div className="w-[23px] h-[23px] md:cursor-pointer">
                  <HomeIcon />
                </div>
              </Link>
            </li>
            <li>
              <Link href={appRoutes.home} passHref>
                <div className="w-[23px] h-[23px] md:cursor-pointer">
                  <HomeIcon />
                </div>
              </Link>
            </li>
            <li>
              <Link href={appRoutes.home} passHref>
                <div className="w-[23px] h-[23px] md:cursor-pointer">
                  <HomeIcon />
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
