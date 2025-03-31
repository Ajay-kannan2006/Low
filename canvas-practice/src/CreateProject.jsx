import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleCreateCanvas = async (e) => {
    e.preventDefault();
    try {
      if (title === "") {
        setError("Title is Required");
        return;
      }
      const res = await axios.post(
        "http://localhost:8080/api/project/create-project",
        {
          title: title,
        },
        { withCredentials: true }
      );
      console.log(res);

        navigate("/project", { state: res.data.projectDoc });
    } catch (err) {
      setError("Something went wrong try Again");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-8 border-2 border-amber-800">
      <div className="flex flex-col items-center justify-center w-[350px] h-[350px] border-amber-400 border-4 rounded-[9px] gap-4">
        <div className="w-80 text-center">
          <p className="text-xl border-b-1 w-full">
            <span className="font-bold text-blue-600">Create New Project</span>
          </p>
        </div>
        <div className="w-[850px] text-center flex flex-col gap-3">
          <div className="flex items-center justify-center">
            <form
              className="flex flex-col w-[400px] h-full gap-3 items-center justify-center"
              onSubmit={handleCreateCanvas}
            >
              <div className="flex flex-col items-start justify-center ml-[300px]">
                <label
                  htmlFor=""
                  className="text-black text-sm font-medium relative left-2.5"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="border-2 border-[#d5d5d7] w-80 h-11 bg-[#f6f6f9] rounded-[9px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="bg-[#632379] w-80 h-11 text-white px-3 py-2 font-medium shadow-md transition duration-300 hover:bg-[#7a2c94] hover:shadow-lg active:scale-95  rounded-3xl border border-transparent"
                  style={{ borderRadius: "9px" }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        <span className="text-[#ff0000]"> {error}</span>
      </div>
    </div>
  );
};

export default CreateProject;
