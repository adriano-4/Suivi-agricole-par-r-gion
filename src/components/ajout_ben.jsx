import NavBar from "../components/navBar";
import { useState, useEffect } from "react";
import "../css/beneficiaire.css";
import "../css/alert.css";
import { getAllRegions } from "../service/region";
import { getDistrictsByRegion } from "../service/district";
import {
  getAppartenances,
  getAppartenancesByRegion,
} from "../service/appartenance";
import { addBeneficiaire } from "../service/beneficiaire";
import Alert_message from "../components/alert_message";

function AjoutBen({ setShowAjout_ben, refreshBeneficiaires }) {
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [appartenances, setAppartenances] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: "" });

  const [formData, setFormData] = useState({
    nomBenef: "",
    prenomBenef: "",
    surnomBenef: "",
    cin: "",
    datnais: "",
    lieunais: "",
    genre: "",
    situationMat: "",
    nomConjoint: "",
    contact: "",
    idAppartenance: "",
  });

  // Fonction pour afficher l'alerte et la cacher automatiquement après 5s
  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => {
      setAlert({ visible: false, message: "" });
    }, 5000);
  };

  // useEffect(() => {
  //   const fetchAppartenances = async () => {
  //     try {
  //       const data = await getAppartenances();
  //       setAppartenances(data);
  //     } catch (error) {
  //       showAlert("Erreur lors du chargement des appartenances");
  //     }
  //   };
  //   fetchAppartenances();
  // }, []);
  useEffect(() => {
    const fetchAppartenances = async () => {
      try {
        let regionName = localStorage.getItem("region");

        if (regionName?.startsWith('"') && regionName.endsWith('"')) {
          regionName = regionName.slice(1, -1);
        }

        let data = [];

        if (regionName && regionName.trim() !== "") {
          const allRegions = await getAllRegions();

          const matchedRegion = allRegions.find(
            (reg) =>
              reg.nomReg.toLowerCase().trim() ===
              regionName.toLowerCase().trim()
          );

          if (matchedRegion && matchedRegion.id) {
            data = await getAppartenancesByRegion(matchedRegion.id);
          } else {
            console.warn("Aucune région trouvée avec ce nom :", regionName);
            data = [];
          }
        } else {
          data = await getAppartenances();
        }

        setAppartenances(data);
      } catch (error) {
        showAlert("Erreur lors du chargement des appartenances");
      }
    };

    fetchAppartenances();
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await getAllRegions();
        setRegions(data);
      } catch (error) {
        showAlert("Erreur lors du chargement des régions");
      }
    };
    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "situationMat" && value === "Célibataire"
        ? { nomConjoint: "" }
        : {}),
    }));
  };

  const handleRegionChange = async (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);
    if (regionId) {
      try {
        const data = await getDistrictsByRegion(regionId);
        setDistricts(data);
      } catch (error) {
        showAlert("Erreur lors du chargement des districts");
      }
    } else {
      setDistricts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nomBenef || !formData.prenomBenef || !formData.cin) {
      showAlert("Nom, prénom et CIN sont obligatoires");
      return;
    }

    const datNaisWithTime = formData.datnais
      ? `${formData.datnais}T00:00:00`
      : null;
    try {
      const payload = {
        nom: formData.nomBenef,
        prenom: formData.prenomBenef,
        surnom: formData.surnomBenef,
        cin: formData.cin,
        dateNaissance: formData.datnais ? `${formData.datnais}T00:00:00` : null,
        lieuNaissance: formData.lieunais,
        genre: formData.genre,
        situationMatrimoniale: formData.situationMat,
        nomConjoint: formData.nomConjoint,
        contact: formData.contact,
        appartenance: { idAppartenance: formData.idAppartenance },
      };

      await addBeneficiaire(payload);
      setShowAjout_ben(false);
      if (refreshBeneficiaires) refreshBeneficiaires();
    } catch (error) {
      showAlert("Erreur lors de l'ajout du bénéficiaire");
    }
  };

  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Ajout de nouveau bénéficiaire</h3>
          <button onClick={() => setShowAjout_ben(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="bas3">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Nom"
                name="nomBenef"
                value={formData.nomBenef}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Prénom"
                name="prenomBenef"
                value={formData.prenomBenef}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Surnom"
                name="surnomBenef"
                value={formData.surnomBenef}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="CIN"
                name="cin"
                value={formData.cin}
                onChange={handleChange}
                maxLength={12}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Date de naissance"
                name="datnais"
                value={formData.datnais}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Lieu de naissance"
                name="lieunais"
                value={formData.lieunais}
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              >
                <option value="">Genre</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
            <div>
              <select
                name="situationMat"
                value={formData.situationMat}
                onChange={handleChange}
              >
                <option value="">Situation Matrimoniale</option>
                <option value="Marié">Marié(e)</option>
                <option value="Célibataire">Célibataire</option>
              </select>
              <input
                type="text"
                placeholder="Nom du conjoint(e)"
                name="nomConjoint"
                value={formData.nomConjoint}
                onChange={handleChange}
                disabled={formData.situationMat === "Célibataire"}
                style={{
                  cursor:
                    formData.situationMat === "Célibataire"
                      ? "not-allowed"
                      : "text",
                }}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                maxLength={10}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
            <div>
              <select
                name="idAppartenance"
                value={formData.idAppartenance}
                onChange={handleChange}
              >
                <option value="">Perimètre d'appartenance</option>
                {appartenances.map((app) => (
                  <option key={app.idAppartenance} value={app.idAppartenance}>
                    {app.nomAppartenance}
                  </option>
                ))}
              </select>
            </div>

            {/* <div id="button_">
              <button type="button" onClick={() => setShowAjout_ben(false)}>
                Annuler
              </button>
              <button type="submit">Ajouter</button>
            </div> */}
            <div id="button_">
              {" "}
              <button
                type="button"
                onClick={() => setShowAjout_ben(false)}
                id="annuler_ajout_ben"
              >
                {" "}
                Annuler{" "}
              </button>{" "}
              <button type="submit" id="ajouter_ajout_ben">
                {" "}
                Ajouter{" "}
              </button>{" "}
            </div>
          </form>
        </div>
      </div>

      {/* Composant Alert */}
      <Alert_message
        visible={alert.visible}
        message={alert.message}
        onClose={() => setAlert({ ...alert, visible: false })}
      />
    </div>
  );
}

export default AjoutBen;
