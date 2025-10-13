import NavBar from "../components/navBar";
import "../css/responsable.css";
import Respo from "../components/respo";
import { useState, useEffect } from "react";

// importer toutes les fonctions API regroupées
import {
  getSuperviseurs,
  createSuperviseur,
  updateSuperviseur,
  deleteSuperviseur,
  getTechniciens,
  createTechnicien,
  updateTechnicien,
  deleteTechnicien,
  getResponsables,
  createResponsable,
  updateResponsable,
  deleteResponsable,
} from "../service/responsable";

function Responsable() {
  return (
    <div id="ppale_resp">
      <NavBar />

      <div id="affichagerespo">
        <button>
          <i className="fa fa-home"></i>
          <span>Superviseur</span>
        </button>
        <button>
          <i className="fa fa-home"></i>
          <span>Technicien</span>
        </button>
        <button>
          <i className="fa fa-home"></i>
          <span>Responsable Magasin</span>
        </button>
      </div>
    </div>
  );
}

export default Responsable;
