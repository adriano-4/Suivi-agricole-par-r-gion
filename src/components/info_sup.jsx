import NavBar from "../components/navBar";
import "../css/formation.css";
import NavItem from "../components/NavItem";
import { height } from "@fortawesome/free-brands-svg-icons/fa11ty";

function info_sup({ setshowInfo_sup }) {
  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Information supprlémentaire sur cette livraison</h3>
          <button onClick={() => setshowInfo_sup(false)}>
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
              <p>Perimetre Irrigé cible :</p>
              <span>Masculin</span>
            </div>
            <div>
              <p>Nom localité de livraison :</p>
              <span>092032</span>
            </div>
            <div>
              <p>Nom de l'agent receptionnaire :</p>
              <span>AMBODINISOTRY</span>
            </div>
            <div>
              <p>Contact de l'agent receptionnaire :</p>
              <span>AMBODINISOTRY</span>
            </div>
            <div>
              <p>Nom du responsable de stockage :</p>
              <span>AMBODINISOTRY</span>
            </div>
            <div>
              <p>Contact du responsable de stockage :</p>
              <span>AMBODINISOTRY</span>
            </div>
            <button>
              <span>Modifier</span>
              <i className="fa fa-pen"></i>
            </button>
          </div>
          <div className="bas_droite" id="bas_droite_info_sup">
            <h3>Période de livraison</h3>
            <div>
              <p>Date de début</p>
              <span></span>
            </div>
            <div>
              <p>Variété cultivé</p>
              <span></span>
            </div>
            <h3>Campagne Actuelle</h3>
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

export default info_sup;
