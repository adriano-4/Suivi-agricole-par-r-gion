import NavBar from "../components/navBar";
import "../css/intrant.css";
import NavItem from "../components/NavItem";

function Intrant() {
  return (
    <div>
      <NavBar />
      <div id="recherche">
        <div className="gauche">
          <h2>Liste des Instrants</h2>
        </div>
        <div className="option">
          <input
            type="text"
            placeholder="Recherche intrant ..."
            id="recherche_benef"
          />
          <button onClick={() => setShowAjout_ben(true)}>
            <span>Nouveau intrant</span>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <div id="tableau">
        <table>
          <thead>
            <tr>
              <th>Type intrant</th>
              <th>Unité de mesure</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UREE</td>
              <td>tonne</td>
              <td id="btn_td">
                <button id="mod">
                  <i className="fa fa-pen"></i>
                </button>
                <button id="sup">
                  <i className="fa fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Intrant;
