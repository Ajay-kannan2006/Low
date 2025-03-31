import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Try from "./Try.jsx";
import Signup from "./LoginSystem/Signup.jsx";
import Login from "./LoginSystem/Login.jsx";
import { BrowserRouter } from "react-router-dom";
import Index from "./Index.jsx";
import NavBar from "./Components/NavBar.jsx";
import CreateProject from "./CreateProject.jsx";
import GrapeApp from "./GrapeApp.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>
  // <App />
  // <GrapeApp />
);
