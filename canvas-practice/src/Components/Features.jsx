import React from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  DashboardIcon,
  FileTextIcon,
  DotsVerticalIcon,
} from "sebikostudio-icons";
import profileImage from "../../public/profile.jpg";
import Recent from "./FeaturesComponents/Recent";
import AllProjects from "./FeaturesComponents/AllProjects";
import { useNavigate } from "react-router-dom";
const Features = ({ children, tab }) => {
  const navigate = useNavigate();
  return (
    <>
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

          <div className="mt-4">
            <div
              className={
                tab === "All Projects"
                  ? "flex w-full h-[50px] bg-[#988cd4] items-center gap-2 px-3 cursor-pointer border-t-2 border-b-2 border-black"
                  : "flex w-full h-[50px] items-center gap-2 px-3 cursor-pointer border-t-2 border-b-2 border-black"
              }
              onClick={() => {
                navigate("/works/all-projects");
              }}
            >
              <DashboardIcon className="w-5" />
              <p className="mt-3">All Projects</p>
            </div>

            <div
              className={
                tab === "Recents"
                  ? "flex w-full h-[50px] bg-[#988cd4] items-center gap-2 px-3 cursor-pointer  border-b-2 border-black"
                  : "flex w-full h-[50px] items-center gap-2 px-3 cursor-pointer  border-b-2 border-black"
              }
              onClick={() => {
                navigate("/works/recents");
              }}
            >
              <ClockIcon className="w-5" />
              <p className="mt-3">Recents</p>
            </div>

            <div
              className={
                tab === "Favourites"
                  ? "flex w-full h-[50px] bg-[#988cd4] items-center gap-2 px-3 cursor-pointer  border-b-2 border-black"
                  : "flex w-full h-[50px] items-center gap-2 px-3 cursor-pointer  border-b-2 border-black"
              }
              onClick={() => {
                navigate("/works/favourites");
              }}
            >
              <FileTextIcon className="w-5" />
              <p className="mt-3">Favourities</p>
            </div>
          </div>
        </div>

        <div>
          <div className="fixed flex justify-between  p-2 items-center left-[230px] h-15 top-15 w-[calc(100vw-230px)]  border-b-2 border-black">
            <p className="relative top-2.5 left-8">{tab}</p>
            <button
              className=" flex items-center w-auto p-2  border-2 bg-[#632379] h-[50px] border-[#632379] cursor-pointer transition-all duration-200 ease-in-out text-base hover:shadow-xl "
              style={{ borderRadius: "0.9rem", width: "90px" }}
              onClick={() => {
                navigate("/create-project");
              }}
            >
              <span className="flex justify-center items-center text-white font-semibold">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
                Create New Project
              </span>
            </button>
          </div>
          <div className="fixed left-[230px] top-30 right-0  bottom-0 overflow-y-auto p-5">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
