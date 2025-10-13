import NavBar from "../components/navBar";
import "../css/beneficiaire.css";
import NavItem from "../components/NavItem";

function ajout_livraison({ setShowAjout_livraison }) {
  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Nouvelle livraison</h3>
          <button onClick={() => setShowAjout_livraison(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="bas3">
          <form action="">
            <div>
              <select name="region" id="region">
                <option value="region">region</option>
              </select>
              <select name="district" id="district">
                <option value="district">district</option>
              </select>
              <select name="commune" id="commune">
                <option value="commune">commune</option>
              </select>
              <select name="fokontany" id="fokontany">
                <option value="fokontany">fokontany</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Perimètre Irrigé cible" />
              <select name="receptionnaire" id="receptionnaire">
                <option value="receptionnaire">Receptionnaire</option>
              </select>
            </div>
          </form>
          <div id="button_">
            <button
              onClick={() => setShowAjout_livraison(false)}
              id="annuler_ajout_ben"
            >
              Annuler
            </button>
            <button id="ajouter_ajout_ben">Ajouter</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ajout_livraison;
