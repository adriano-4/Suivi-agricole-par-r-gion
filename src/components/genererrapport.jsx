import { useState, useEffect, useCallback } from "react";
import Alert_message from "../components/alert_message";
import "../css/suivi.css";
import Partager_reg from "../components/partager_reg";

function Genererrapport({ setShowGen, regions }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [periode, setPeriode] = useState("mensuel");
  const isRegionSelected = selectedRegions.length > 0;

  const handleSelectChange = useCallback((nom_reg, isSelected) => {
    setSelectedRegions((prev) => {
      if (isSelected) {
        if (!prev.includes(nom_reg)) return [...prev, nom_reg];
        return prev;
      } else {
        return prev.filter((r) => r !== nom_reg);
      }
    });
  }, []);

  useEffect(() => {
    console.log("🌍 Régions sélectionnées :", selectedRegions);
  }, [selectedRegions]);

  return (
    <div id="info_perso">
      <div id="info_perso3">
        <div className="entete">
          <h3>Générer un rapport ✨</h3>

          <button onClick={() => setShowGen(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="bas222">
          <div id="choix_tous22">
            <p>Selection des regions :</p>
            {/* <button>
              <i className="fa fa-check-double"></i>
            </button> */}
            {isRegionSelected && (
              <section onClick={() => setSelectAll((prev) => !prev)}>
                <label style={{ marginLeft: "8px", cursor: "pointer" }}>
                  {selectAll ? "Tout désélectionner" : "Tout sélectionner"}
                </label>
                <i
                  className={`fa ${
                    selectAll ? "fa-check-circle" : "fa-circle"
                  }`}
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    color: selectAll ? "green" : "gray",
                  }}
                ></i>
              </section>
            )}
          </div>
          <div id="reg_choix22">
            {regions.length > 0 ? (
              regions.map((reg, index) => (
                <Partager_reg
                  key={index}
                  nom_reg={reg.nomReg}
                  selectAll={selectAll}
                  onSelectChange={handleSelectChange}
                />
              ))
            ) : (
              <p id="aucu">Aucune région disponible</p>
            )}
          </div>
          <div id="choix_tous22">
            <p>Séléctionner la période :</p>
          </div>
          <div id="periode">
            <button
              className={
                periode === "annuel"
                  ? "btn-periode-active"
                  : "btn-periode-inactive"
              }
              onClick={() => setPeriode("annuel")}
            >
              Annuel
            </button>
            <button
              className={
                periode === "mensuel"
                  ? "btn-periode-active"
                  : "btn-periode-inactive"
              }
              onClick={() => setPeriode("mensuel")}
            >
              Mensuel
            </button>
            <button
              className={
                periode === "hebdomadaire"
                  ? "btn-periode-active"
                  : "btn-periode-inactive"
              }
              onClick={() => setPeriode("hebdomadaire")}
            >
              Hebdomadaire
            </button>
            <button
              className={
                periode === "journaliere"
                  ? "btn-periode-active"
                  : "btn-periode-inactive"
              }
              onClick={() => setPeriode("journaliere")}
            >
              Journalière
            </button>
          </div>

          <div id="choix_tous22">
            <p>Ajouter un commentaire :</p>
          </div>
          <div id="commentaire">
            <textarea placeholder="Ajouter des commentaires ou une description ..." />
          </div>
          <div id="btn-gen">
            <button id="gen-bt">
              <span>Générer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Genererrapport;
