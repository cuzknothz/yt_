import { useAppDispatch } from "@/store";
import { log_out } from "@/store/actions/auth.action";
import Link from "next/link";
import React from "react";
import {
  MdExitToApp,
  MdHistory,
  MdHome,
  MdLibraryBooks,
  MdSentimentDissatisfied,
  MdSubscriptions,
  MdThumbUp,
} from "react-icons/md";

const Sidebar = ({ sidebar, handleToggleSidebar }: any) => {
  const dispatch = useAppDispatch();
  const logOutHandler = () => {
    dispatch(log_out());
  };
  return (
    <nav
      className="w-[200px] h-full flex"
      onClick={() => handleToggleSidebar(false)}
    >
      <Link href="/" passHref>
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <Link href="/feed/subscriptions" passHref>
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>

      <li>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
      </li>

      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>

      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />

        <span>{"I don't Know"}</span>
      </li>

      <hr />

      <li onClick={logOutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <Link href={"/"} passHref>
        <li>
          <MdExitToApp size={23} />
          <span>Home</span>
        </li>
      </Link>
      <Link href={"/auth"} passHref>
        <li>
          <MdExitToApp size={23} />
          <span>signin</span>
        </li>
      </Link>

      <hr />
    </nav>
  );
};

export default Sidebar;
