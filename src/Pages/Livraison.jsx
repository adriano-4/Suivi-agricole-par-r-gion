import NavBar from "../components/navBar";
import "../css/livraison.css";
import NavItem from "../components/NavItem";
import { useState } from "react";
import Ajout_livraison from "../components/ajout_livraison";
import Info_sup from "../components/info_sup";

function Livraison() {
  const [showAjout_livraison, setShowAjout_livraison] = useState(false);
  const [showInfo_sup, setshowInfo_sup] = useState(false);

  return (
    <div>
      <NavBar />

      <div id="recherche">
        <div className="gauche">
          <h2>Planning de livraison intrants</h2>
        </div>
        <div className="option">
          <input
            type="text"
            placeholder="Recherche livraisons ..."
            id="recherche_benef"
          />
          <button onClick={() => setShowAjout_livraison(true)}>
            <span>Nouvelle livraison</span>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <div id="tableau">
        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>District</th>
              <th>Commune</th>
              <th>Fokontany</th>
              <th>Perimètre Irrigé (PI)</th>
              <th>Nom PI cible </th>
              <th>Nom localité de livraison</th>
              <th>Nom AUE d'appartenance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td id="btn_td">
                <button id="info" onClick={() => setshowInfo_sup(true)}>
                  <span>Info Supplementaire</span>{" "}
                  <i className="fa fa-info"></i>
                </button>
                {/* <button id="Apport">
                      <span>Apport</span> <i className="fa fa-info"></i>
                    </button> */}
                <button id="sup">
                  <i className="fa fa-trash-alt"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                Aucun résultat trouvé
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {showAjout_livraison && (
        <Ajout_livraison setShowAjout_livraison={setShowAjout_livraison} />
      )}
      {showInfo_sup && <Info_sup setshowInfo_sup={setshowInfo_sup} />}
    </div>
  );
}

export default Livraison;
