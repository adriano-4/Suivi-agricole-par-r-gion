import NavBar from "../components/navBar";
import "../css/formation.css";
import NavItem from "../components/NavItem";
import { height } from "@fortawesome/free-brands-svg-icons/fa11ty";

function vulgarisation({ setShowVulg, formation }) {

  console.log(formation.idVulg);
  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Vulgarisation</h3>
          <button onClick={() => setShowVulg(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="bas">
          <div className="bas_gauche">
            <div>
              <p>Region :</p>
              <span>{formation.nomReg}</span>
            </div>
            <div>
              <p>District :</p>
              <span>{formation.nomDist}</span>
            </div>
            <div>
              <p>Commune :</p>
              <span>{formation.nomComm}</span>
            </div>
            <div>
              <p>Fokontany :</p>
              <span>{formation.nomFok}</span>
            </div>
            <div>
              <p>Lieu de Formation :</p>
              <span>{formation.nomAppartenance}</span>
            </div>
            <div>
              <p>Superviseur responsable :</p>
              <span>
                {formation.nomSup} {formation.prenomSup}
              </span>
            </div>
            <div>
              <p>Technicien responsable :</p>
              <span>
                {formation.nomTech} {formation.prenomTech}
              </span>
            </div>
            <button>
              <span>Modifier</span>
              <i className="fa fa-pen"></i>
            </button>
          </div>
          <div className="bas_droite" id="bas_droite_vulg">
            <div>
              <p>Nombre d'EAF encadré</p>
              <span>{formation.nbrEafEncadre}</span>
            </div>
            <div>
              <p>Nombre de PF</p>
              <span>{formation.nbrPf}</span>
            </div>
            <div>
              <p>Nombre de PF/CEP</p>
              <span>{formation.nbrPfCep}</span>
            </div>
            <div>
              <p>Superficie cible</p>
              <span>{formation.superficieCible}</span>
            </div>
            <div>
              <p>outil de formation pour PF</p>
              <span>{formation.outilFormationPf}</span>
            </div>
            <div>
              <p>plaque d'identification PF</p>
              <span>{formation.plaqueIdentificationPf}</span>
            </div>
            <div>
              <p>Fiche BPA SRA-Compost à dupliquer</p>
              <span>{formation.ficheBpaSraComposte}</span>
            </div>
            <div>
              <p>Fiche BP post-recolte à dupliquer</p>
              <span>{formation.ficheBpPostRecolte}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default vulgarisation;
