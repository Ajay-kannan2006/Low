import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const NavBar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout Successful");
      // Redirect after successful logout
      navigate("/signin");
      // Optional: Clear any client-side state
      // localStorage.removeItem('userData');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-[#632379] text-white w-full h-15 z-50 fixed top-0 left-0">
      <div className="text-2xl m-4">LowCode NoCode</div>
      <div className="px-4 pt-2">
        <ul className="flex items-center justify-center gap-4 list-none">
          <li
            tabIndex={0}
            className="cursor-pointer select-none hover:text-black"
          >
            <Link
              to="/home"
              className="no-underline text-white hover:border-b-2 border-white focus:border-b-2 focus:border-white focus:outline-none"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
          </li>
          <li tabIndex={0} className="cursor-pointer select-none">
            <Link
              to="/works/all-projects"
              className="no-underline text-white hover:border-b-2 border-white focus:border-b-2 focus:border-white focus:outline-none"
              style={{ textDecoration: "none" }}
            >
              Work
            </Link>
          </li>

          <li tabIndex={0} className="cursor-pointer select-none">
            <Link
              to="/about"
              className="no-underline text-white hover:border-b-2 border-white focus:border-b-2 focus:border-white focus:outline-none"
              style={{ textDecoration: "none" }}
            >
              About Us
            </Link>
          </li>
          <li tabIndex={0} className="cursor-pointer select-none">
            <Link
              to="/admin"
              className="no-underline text-white hover:border-b-2 border-white focus:border-b-2 focus:border-white focus:outline-none"
              style={{ textDecoration: "none" }}
            >
              Admin
            </Link>
          </li>
          <li
            tabIndex={0}
            className="cursor-pointer select-none text-white hover:text-black"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
