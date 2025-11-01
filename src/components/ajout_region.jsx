import { useState, useEffect } from "react";
import "../css/region.css";
import { getRegions } from "../service/regionrefService";
import { getAllRegions, addRegion } from "../service/region";
import Alert_message from "./Alert_message";

function AjoutRegion({ setShowAjout_reg }) {
  const [regionRefs, setRegionRefs] = useState([]);
  const [regions, setRegions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRegionRef, setSelectedRegionRef] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getRegions()
      .then((data) => setRegionRefs(data))
      .catch((err) => console.error(err));

    getAllRegions()
      .then((data) => setRegions(data))
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   if (!inputValue) {
  //     setSuggestions([]);
  //   } else {
  //     const filtered = regionRefs.filter((r) =>
  //       r.nomRegref?.toLowerCase().includes(inputValue.toLowerCase())
  //     );
  //     setSuggestions(filtered);
  //   }
  // }, [inputValue, regionRefs]);
  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
    } else {
      const filtered = regionRefs.filter(
        (r) =>
          r.nomRegref?.toLowerCase().includes(inputValue.toLowerCase()) &&
          r.nomRegref.toLowerCase() !== inputValue.toLowerCase() // ✅ évite la redondance
      );
      setSuggestions(filtered);
    }
  }, [inputValue, regionRefs]);

  const handleSuggestionClick = (region) => {
    setInputValue(region.nomRegref);
    setSelectedRegionRef(region);
    setSuggestions([]);
    setErrorMessage("");
  };

  const handleAddRegion = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedRegionRef) {
      setErrorMessage("Veuillez sélectionner une région de référence.");
      setShowAlert(true);
      return;
    }

    const alreadyExists = regions.some(
      (r) => r.nomReg.toLowerCase() === inputValue.toLowerCase()
    );

    if (alreadyExists) {
      setErrorMessage("Cette région existe déjà.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    const regionDTO = {
      nomReg: inputValue,
      idRegRef: selectedRegionRef.idRegRef,
    };

    try {
      const newRegion = await addRegion(regionDTO.nomReg, regionDTO.idRegRef);
      setRegions([...regions, newRegion]);

      setErrorMessage("Ajout de la nouvelle region !");
      setShowAlert(true);

      setInputValue("");
      setSelectedRegionRef(null);
      setSuggestions([]);

      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la région :", error);
      setErrorMessage("Impossible d'ajouter la région.");
      setShowAlert(true);
    }
  };

  return (
    <div id="info_perso">
      <div id="info_perso3">
        <div className="entete">
          <h3>Ajout de nouvelle region</h3>
          <button onClick={() => setShowAjout_reg(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="bas3">
          <form onSubmit={handleAddRegion}>
            <div id="bas3__">
              <input
                type="text"
                placeholder="Nom du région"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            {suggestions.length > 0 && (
              <div id="suggestions-list">
                {suggestions.map((s) => (
                  <div
                    key={s.idRegRef}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSuggestionClick(s);
                    }}
                  >
                    {s.nomRegref}
                  </div>
                ))}
              </div>
            )}

            <div id="button_">
              <button
                type="button"
                onClick={() => setShowAjout_reg(false)}
                id="annuler_ajout_ben"
              >
                Annuler
              </button>
              <button type="submit" id="ajouter_ajout_ben">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Affichage du composant d'erreur */}
      <Alert_message
        visible={showAlert}
        message={errorMessage}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}

export default AjoutRegion;
