import React from "react";

export const SideBar: React.FC = () => {
  return (
    <>
      <div className="z-20 sm:hidden bg-white w-screen md:w-[160px] h-[60px] fixed bottom-0 md:block flex justify-evenly items-center md:bottom-auto md:h-auto ">
        <div className="md:pl-[20px] pl-0 w-auto md:w-full md:h-[50px] h-auto bg-black/20 flex items-center">
          Home
        </div>
        <div className="md:pl-[20px] pl-0 w-auto md:w-full md:h-[50px] h-auto bg-black/20 flex items-center">
          Explore
        </div>
        <div className="md:pl-[20px] pl-0 w-auto md:w-full md:h-[50px] h-auto bg-black/20 flex items-center">
          Subscriptions
        </div>
        <div className="md:pl-[20px] pl-0 w-auto md:w-full md:h-[50px] h-auto bg-black/20 flex items-center">
          Library
        </div>
      </div>
    </>
  );
};
