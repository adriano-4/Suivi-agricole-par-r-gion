import "../css/suppression.css";

function suppression({ titre_sup, texte, setShowSupCrud, onConfirmDelete }) {
  return (
    <div id="info_perso">
      <div id="sup_div">
        <h4>Voulez-vous supprimer cet {titre_sup} ?</h4>
        <p>
          Cet {titre_sup} va être supprimé définitivement. {texte}
        </p>
        <div className="btn_supprimer">
          <button
            id="oui_sup"
            onClick={() => {
              console.log("Suppression demandée !");
              onConfirmDelete();
            }}
          >
            OUI
          </button>
          <button id="non_sup" onClick={() => setShowSupCrud(false)}>
            NON
          </button>
        </div>
      </div>
    </div>
  );
}

export default suppression;
