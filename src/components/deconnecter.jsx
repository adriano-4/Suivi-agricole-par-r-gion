import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/deconnecter.css";
import { useNavigate } from "react-router-dom";

function Deconnecter({ setShowDeco }) {
  const navigate = useNavigate();

  const handleDeconnecter = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("region");
    localStorage.removeItem("user");

    navigate("/");
    setShowDeco(false);
  };

  const handleAnnuler = () => {
    setShowDeco(false);
  };

  return (
    <div className="cont">
      <div className="cont1">
        <h3>
          <span>Voulez vous vous déconnecter ?</span>
        </h3>
        <div className="button">
          <button onClick={handleDeconnecter}>OUI</button>
          <button onClick={handleAnnuler} id="non2">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deconnecter;
