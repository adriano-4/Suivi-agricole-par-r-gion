import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navBar.css";
import minaelogo from "../assets/minaelogo.png";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");

  return (
    <nav className="navbar">
      <div></div>
      <div className="navbar__logo">
        <img src={minaelogo} alt="" />
      </div>
      <div className="navbar_droite">
        <p id="user_compte">
          <i className="fa fa-user"></i>
          <span>{user}</span>
        </p>
        <button id="déco" onClick={() => navigate("/navigation")}>
          <i className="fa fa-home"></i>
          <span>Acceuil</span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
