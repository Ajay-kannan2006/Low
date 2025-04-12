import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DotsVerticalIcon,
  HeartFilledIcon,
  HeartIcon,
} from "sebikostudio-icons";
import axios from "axios";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [favourite, setFavourite] = useState(item.isFavourite);
  const openProject = (item) => {
    console.log(item);
    navigate("/project", { state: item });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteProject = async () => {
    const value = prompt("Type 'DELETE' to delete the project");
    if (value == "DELETE") {
      const res = await axios.delete(
        `http://localhost:8080/api/project/delete-project/${item._id}`,
        { withCredentials: true }
      );
      console.log(res);
      window.location.reload();
    }
  };

  const toggleFavourite = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/project/update-favourite/${item._id}`,
        {
          isFavourite: !favourite,
        }
      );
      setFavourite(current => !current);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[250px] h-[250px] bg-[#988cd4] rounded-[10px] relative flex flex-col justify-between p-2 cursor-pointer">
      <div className="absolute top-[10px] right-[10px]" ref={dropdownRef}>
        <DotsVerticalIcon
          className="text-black cursor-pointer"
          onClick={() => setClicked((prev) => !prev)}
        />
        {clicked && (
          <div className="absolute top-full right-0 w-23 bg-white border shadow-md px-2 py-1 rounded-md">
            <div
              className="cursor-pointer hover:bg-gray-100 px-2 py-1 text-center"
              onClick={() => deleteProject()}
            >
              Delete
            </div>
          </div>
        )}
      </div>

      {/* Image */}
      <img
        src={item.projectImg || ""}
        className="bg-[#f5f5f5] w-[240px] h-[180px] flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          openProject(item);
        }}
      />

      {/* Title & Heart Icon */}
      <div className="mt-2 w-full">
        <div className="flex justify-between mx-1">
          <p className="text-lg font-bold m-0">{item.title}</p>
          {favourite ? (
            <HeartFilledIcon
              className="mx-1  cursor-pointer text-red-700   stroke-black hover:text-red-700 transition duration-300"
              style={{ fill: "red" }}
              onClick={() => toggleFavourite()}
            />
          ) : (
            <HeartIcon
              className="mx-1 cursor-pointer transition duration-300"
              onClick={() => toggleFavourite()}
            />
          )}
        </div>
        <p className="text-sm text-gray-600 px-1">
          Last Updated: {item.timeAgo}
        </p>
      </div>
    </div>
  );
};

export default Card;
