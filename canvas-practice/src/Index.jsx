import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./LoginSystem/Login";
import Signup from "./LoginSystem/Signup";
// import App from './App';
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Features from "./Components/Features";
import Work from "./Components/Work";
import About from "./Components/About";
import Profile from "./Components/Profile";
import Recent from "./Components/FeaturesComponents/Recent";
import Favourites from "./Components/FeaturesComponents/Favourites";
import AllProjects from "./Components/FeaturesComponents/AllProjects";
import CreateProject from "./CreateProject";
import GrapeApp from "./GrapeApp";
import Index1 from "./sketchCode/Index1";

const MainLayout = ({ children }) => (
  <>
    <div className="flex">
      <NavBar />
      {children}
    </div>
  </>
);

const Index = () => {
  return (
    <>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* main with navbar*/}
        {/* <Route path='/canvas' element={<App />} /> */}
        <Route
          path="/home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/works/all-projects"
          element={
            <MainLayout>
              {" "}
              <Features tab="All Projects">
                <AllProjects />
              </Features>{" "}
            </MainLayout>
          }
        />
        <Route
          path="/works/recents"
          element={
            <MainLayout>
              {" "}
              <Features tab="Recents">
                <Recent />
              </Features>{" "}
            </MainLayout>
          }
        />
        <Route
          path="/works/favourites"
          element={
            <MainLayout>
              {" "}
              <Features tab="Favourites">
                <Favourites />
              </Features>{" "}
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              {" "}
              <About />{" "}
            </MainLayout>
          }
        />
        <Route
          path="/Profile"
          element={
            <MainLayout>
              {" "}
              <Profile />{" "}
            </MainLayout>
          }
        />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project" element={<GrapeApp />} />
        <Route path="/canvas" element={<Index1 />} />
      </Routes>
    </>
  );
};

export default Index;
