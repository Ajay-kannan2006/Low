import React, { useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  DashboardIcon,
  FileTextIcon,
} from "sebikostudio-icons";
import profileImage from "../../public/profile.jpg";
import Recent from "./FeaturesComponents/Recent";
import AllProjects from "./FeaturesComponents/AllProjects";
import Favourite from "./FeaturesComponents/Favourites";

const Profile = () => {
  return (
    <div className="w-full h-full">
      <div className="fixed left-0 top-15 h-full w-[230px] border-r-2 border-black z-20">
        <div className="flex items-center justify-between mx-3">
          <div className="flex items-center justify-center gap-2">
            <img
              src={profileImage}
              alt="profileImage"
              className="w-7 h-7 rounded-full border-black border-2"
            />
            <p className="font-medium pt-3">Admin</p>
          </div>
          <BellIcon className="text-black" />
        </div>

        <div className="relative left-3 w-[200px]">
          <div className="flex items-center justify-evenly bg-gray-200 rounded-lg px-2 py-1 gap-1">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for anything"
              className="bg-transparent outline-none pl-2 w-full"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="fixed left-[230px] top-15 w-full h-[60px] border-b-2 border-black">
          <p>poda</p>
        </div>
      </div>
      <h1>hello</h1>
    </div>
  );
};

export default Profile;
