import NavBar from "../components/navBar";
import "../css/formation.css";
import NavItem from "../components/NavItem";
import { height } from "@fortawesome/free-brands-svg-icons/fa11ty";

function intrant_comp({ setShowIntrantComp }) {
  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Intrants</h3>
          <button onClick={() => setShowIntrantComp(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="bas">
          <div className="bas_gauche">
            <div>
              <p>Region :</p>
              <span>FITOVINANY</span>
            </div>
            <div>
              <p>District :</p>
              <span>Toky Adriano</span>
            </div>
            <div>
              <p>Commune :</p>
              <span>Toky</span>
            </div>
            <div>
              <p>Fokontany :</p>
              <span>374376</span>
            </div>
            <div>
              <p>Lieu de Formation :</p>
              <span>Masculin</span>
            </div>
            <div>
              <p>Superviseur responsable :</p>
              <span>092032</span>
            </div>
            <div>
              <p>Technicien responsable :</p>
              <span>AMBODINISOTRY</span>
            </div>
            <button>
              <span>Modifier</span>
              <i className="fa fa-pen"></i>
            </button>
          </div>
          <div className="bas_droite" id="bas_droite_vulg">
            <div>
              <p>NPK</p>
              <span>12</span>
            </div>
            <div>
              <p>UREE</p>
              <span>12</span>
            </div>
            <div>
              <p>UREE</p>
              <span>12</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default intrant_comp;
