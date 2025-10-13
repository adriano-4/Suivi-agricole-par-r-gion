import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navBarPage.css";
import minaelogo from "../assets/minaelogo.png";

function NavBarPage({ setShowDeco }) {
  const user = localStorage.getItem("user");
  return (
    <nav className="navbar2">
      <div></div>
      <div className="navbar__logo2">
        <img src={minaelogo} alt="" />
      </div>
      <div className="navbar_droite2">
        <p id="user_compte">
          <i className="fa fa-user"></i>
          <span>{user}</span>
        </p>
        <button id="déco" onClick={() => setShowDeco(true)}>
          <i className="fa fa-sign-out-alt"></i>
          <span>Se Deconnecter</span>
        </button>
      </div>
    </nav>
  );
}

export default NavBarPage;
