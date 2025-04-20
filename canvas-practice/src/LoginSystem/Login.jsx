import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [error, setError] = useState({});
  const [isExist, setIsExist] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "https://low-0msq.onrender.com/api/auth/check-user",
          { withCredentials: true }
        );
        console.log(res);

        if (res.data.logged) {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };

    checkUser();
  }, []);

  const handleSubmit = async (e) => {
    console.log("hello");

    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(username);

    const newError = {};

    if (!username.trim()) {
      newError.username = "Username is Required";
    } else if (username.length < 3) {
      newError.username = "Username at least 3 character";
    }

    if (!password.trim()) {
      newError.password = "Password is required";
    } else if (password.length <= 4) {
      newError.password = "password at least 4 character";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    setError({});
    setErrorMessage("");
    setIsExist(false);

    try {
      const res = await axios.post(
        "https://low-0msq.onrender.com/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // localStorage.setItem("user", JSON.stringify(res.data));
      console.log("Login Successful:", res.data);

      navigate("/home");
      console.log("hello");
    } catch (err) {
      setIsExist(true);
      setErrorMessage(err.response.data.message);
      console.log("error adikuthu" + err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-8 border-2 border-amber-800">
      <div className="flex flex-col items-center justify-center w-[500px] h-[500px] border-amber-400 border-4 rounded-[9px] gap-4">
        <div className="w-80 text-center">
          <p className="text-xl border-b-1 w-full">
            <span className="font-bold text-blue-600">Low Code</span> / Sketch
            to Code
          </p>
        </div>
        <div className="w-[850px] text-center flex flex-col gap-3">
          <div className="flex items-center justify-center">
            <form
              className="flex flex-col w-[400px] h-full gap-3 items-center justify-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-start justify-center ml-[300px]">
                <label
                  htmlFor=""
                  className="text-black text-sm font-medium relative left-2.5"
                >
                  UserName
                </label>
                <input
                  type="text"
                  name="username"
                  className="border-2 border-[#d5d5d7] w-80 h-11 bg-[#f6f6f9] rounded-[9px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                {error.username && (
                  <p className="text-red-500 text-sm px-2">{error.username}</p>
                )}
              </div>

              <div className="flex flex-col items-start justify-center ml-[300px]">
                <label
                  htmlFor=""
                  className="text-black text-sm font-medium relative left-2.5"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="border-2 border-[#d5d5d7] w-80 h-11 bg-[#f6f6f9] rounded-[9px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                {error.password && (
                  <p className="text-red-500 text-sm px-2">{error.password}</p>
                )}
              </div>

              {/* buttons */}
              {isExist && (
                <p className="text-red-500 text-sm px-2">{errorMessage}</p>
              )}
              <div className="flex flex-col gap-2">
                <button
                  className="bg-[#632379] w-80 h-11 text-white px-3 py-2 font-medium shadow-md transition duration-300 hover:bg-[#7a2c94] hover:shadow-lg active:scale-95  rounded-3xl border border-transparent"
                  style={{ borderRadius: "9px" }}
                >
                  Login
                </button>
                <p>
                  Are you New?{" "}
                  <Link to="/register" className="text-blue-500 cursor-pointer">
                    Create a Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
