import NavBar from "../components/navBar";
import "../css/beneficiaire.css";
import NavItem from "../components/NavItem";
import { useState, useEffect } from "react";
import { getSuperviseurs, getTechniciens } from "../service/responsable";
import {
  getAppartenances,
  getAppartenancesByRegion,
} from "../service/appartenance";
import { getAllRegions } from "../service/region";
import Alert_message from "../components/alert_message";
import { createFormation } from "../service/formation";

function ajout_formation({ setShowAjout_form, refreshFormations }) {
  const [regions, setRegions] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: "" });
  const [superviseurs, setSuperviseurs] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [appartenances, setAppartenances] = useState([]);

  const [formData, setFormData] = useState({
    idAppartenance: "",
    dateformation: "",
    superviseur: "",
    technicien: "",
  });

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => {
      setAlert({ visible: false, message: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.idAppartenance || !formData.dateformation) {
      showAlert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const payload = {
      idAppartenance: parseInt(formData.idAppartenance),
      idSup: formData.superviseur ? parseInt(formData.superviseur) : null,
      idTech: formData.technicien ? parseInt(formData.technicien) : null,
      dateFormation: formData.dateformation + "T00:00:00",
      remarque: "",
    };

    try {
      const result = await createFormation(payload);
      showAlert("Formation créée avec succès !");
      await refreshFormations();
      setTimeout(() => {
        setShowAjout_form(false);
      }, 5000);
    } catch (error) {
      showAlert("Erreur lors de la création de la formation.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supRes = await getSuperviseurs();
        const techRes = await getTechniciens();
        setSuperviseurs(supRes.data || supRes);
        setTechniciens(techRes.data || techRes);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des superviseurs/techniciens :",
          error
        );
      }
    };

    fetchData();
  }, []);

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
        console.error("Erreur lors du chargement des appartenances:", error);
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
        // showAlert("Erreur lors du chargement des régions");
      }
    };
    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Prévoir une nouvelle formation</h3>
          <button onClick={() => setShowAjout_form(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="bas3">
          <form onSubmit={handleSubmit}>
            {/* <div>
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
            </div> */}
            <div>
              <input
                type="date"
                placeholder="Date de formation"
                name="dateformation"
                value={formData.dateformation}
                onChange={handleChange}
              />
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
            <div>
              <select
                name="superviseur"
                id="superviseur"
                value={formData.superviseur}
                onChange={handleChange}
              >
                <option value="">Superviseur responsable</option>
                {superviseurs.map((sup) => (
                  <option key={sup.idSup} value={sup.idSup}>
                    {sup.nomSup}
                  </option>
                ))}
              </select>

              <select
                name="technicien"
                id="technicien"
                value={formData.technicien}
                onChange={handleChange}
              >
                <option value="">Technicien vulgarisateur</option>
                {techniciens.map((tech) => (
                  <option key={tech.idTech} value={tech.idTech}>
                    {tech.nomTech}
                  </option>
                ))}
              </select>
            </div>
            <div id="button_">
              <button
                onClick={() => setShowAjout_form(false)}
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
      <Alert_message
        visible={alert.visible}
        message={alert.message}
        onClose={() => setAlert({ ...alert, visible: false })}
      />{" "}
    </div>
  );
}

export default ajout_formation;
