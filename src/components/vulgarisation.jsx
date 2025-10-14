import { useState, useEffect } from "react";
import { getSuperviseurs, getTechniciens } from "../service/responsable";
import {
  getAppartenances,
  getAppartenancesByRegion,
} from "../service/appartenance";
import { getAllRegions } from "../service/region";
import Alert_message from "../components/alert_message";
import { updateVulg } from "../service/vulgarisation";
import { updateFormation } from "../service/formation";

function vulgarisation({ setShowVulg, formation, onUpdateSuccess }) {
  const [isEditing, setIsEditing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [superviseurs, setSuperviseurs] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [appartenances, setAppartenances] = useState([]);
  const [regions, setRegions] = useState([]);
  const [formData, setFormData] = useState({
    nbrEafEncadre: formation.nbrEafEncadre || "",
    nbrPf: formation.nbrPf || "",
    nbrPfCep: formation.nbrPfCep || "",
    superficieCible: formation.superficieCible || "",
    remarque: formation.remarque || "",
    outilFormationPf: formation.outilFormationPf || "",
    plaqueIdentificationPf: formation.plaqueIdentificationPf || "",
    ficheBpaSraComposte: formation.ficheBpaSraComposte || "",
    ficheBpPostRecolte: formation.ficheBpPostRecolte || "",
    nomReg: formation.nomReg || "",
    nomDist: formation.nomDist || "",
    nomComm: formation.nomComm || "",
    nomFok: formation.nomFok || "",
    nomAppartenance: formation.nomAppartenance || "",
    idAppartenance: formation.idAppartenance || "",
    nomSup: formation.nomSup || "",
    prenomSup: formation.prenomSup || "",
    idSup: formation.idSup || "",
    nomTech: formation.nomTech || "",
    prenomTech: formation.prenomTech || "",
    idTech: formation.idTech || "",
  });

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
    const fetchRegions = async () => {
      try {
        const data = await getAllRegions();
        setRegions(data);
      } catch (error) {
        console.error("Erreur lors du chargement des régions :", error);
      }
    };
    fetchRegions();
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
        console.error("Erreur lors du chargement des appartenances :", error);
        showAlert("Erreur lors du chargement des appartenances");
      }
    };

    fetchAppartenances();
  }, []);

  useEffect(() => {
    if (formation && appartenances.length > 0) {
      // Trouver l'appartenance correspondante
      const currentAppartenance = appartenances.find(
        (app) =>
          app.idAppartenance === formation.idAppartenance ||
          app.nomAppartenance === formation.nomAppartenance
      );

      setFormData((prev) => ({
        ...prev,
        ...formation,
        idAppartenance:
          currentAppartenance?.idAppartenance || formation.idAppartenance || "",
      }));
    }
  }, [formation, appartenances]);

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        nbrEafEncadre: formation.nbrEafEncadre || "",
        nbrPf: formation.nbrPf || "",
        nbrPfCep: formation.nbrPfCep || "",
        superficieCible: formation.superficieCible || "",
        remarque: formation.remarque || "",
        outilFormationPf: formation.outilFormationPf || "",
        plaqueIdentificationPf: formation.plaqueIdentificationPf || "",
        ficheBpaSraComposte: formation.ficheBpaSraComposte || "",
        ficheBpPostRecolte: formation.ficheBpPostRecolte || "",
        nomReg: formation.nomReg || "",
        nomDist: formation.nomDist || "",
        nomComm: formation.nomComm || "",
        nomFok: formation.nomFok || "",
        nomAppartenance: formation.nomAppartenance || "",
        idAppartenance: formation.idAppartenance || "",
        nomSup: formation.nomSup || "",
        prenomSup: formation.prenomSup || "",
        idSup: formation.idSup || "",
        nomTech: formation.nomTech || "",
        prenomTech: formation.prenomTech || "",
        idTech: formation.idTech || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      console.log(
        "Données avant envoi - idAppartenance:",
        formData.idAppartenance
      );

      if (!formData.idAppartenance) {
        setAlertMessage("Erreur : Veuillez sélectionner un lieu de formation");
        setAlertVisible(true);
        return;
      }

      const formationData = {
        idTech: formData.idTech,
        idSup: formData.idSup,
        idAppartenance: formData.idAppartenance,
        dateFormation: formation.dateFormation,
        remarque: formData.remarque || "",
      };

      await updateVulg(formation.idVulg, formData);
      await updateFormation(formation.idFormation, formationData);

      setAlertMessage("Mise à jour réussie !");
      setAlertVisible(true);

      setIsEditing(false);
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setAlertMessage("Échec de la mise à jour. Veuillez réessayer.");
      setAlertVisible(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      nbrEafEncadre: formation.nbrEafEncadre || "",
      nbrPf: formation.nbrPf || "",
      nbrPfCep: formation.nbrPfCep || "",
      superficieCible: formation.superficieCible || "",
      remarque: formation.remarque || "",
      outilFormationPf: formation.outilFormationPf || "",
      plaqueIdentificationPf: formation.plaqueIdentificationPf || "",
      ficheBpaSraComposte: formation.ficheBpaSraComposte || "",
      ficheBpPostRecolte: formation.ficheBpPostRecolte || "",
      nomReg: formation.nomReg || "",
      nomDist: formation.nomDist || "",
      nomComm: formation.nomComm || "",
      nomFok: formation.nomFok || "",
      nomAppartenance: formation.nomAppartenance || "",
      idAppartenance: formation.idAppartenance || "",
      nomSup: formation.nomSup || "",
      prenomSup: formation.prenomSup || "",
      idSup: formation.idSup || "",
      nomTech: formation.nomTech || "",
      prenomTech: formation.prenomTech || "",
      idTech: formation.idTech || "",
    });
    setIsEditing(false);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };
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
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  value={formData.nomReg}
                  readOnly
                />
              ) : (
                <span>{formData.nomReg}</span>
              )}
            </div>
            <div>
              <p>District :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  value={formData.nomDist}
                  readOnly
                />
              ) : (
                <span>{formData.nomDist}</span>
              )}
            </div>
            <div>
              <p>Commune :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  value={formData.nomComm}
                  readOnly
                />
              ) : (
                <span>{formData.nomComm}</span>
              )}
            </div>
            <div>
              <p>Fokontany :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  value={formData.nomFok}
                  readOnly
                />
              ) : (
                <span>{formData.nomFok}</span>
              )}
            </div>
            {/* <div>
              <p>Lieu de Formation :</p>
              {isEditing ? (
                <select
                  id="input_update"
                  name="idAppartenance"
                  value={formData.idAppartenance || ""}
                  onChange={(e) => {
                    const selected = appartenances.find(
                      (a) => a.idAppartenance === parseInt(e.target.value)
                    );
                    setFormData((prev) => ({
                      ...prev,
                      idAppartenance: selected?.idAppartenance || "",
                      nomAppartenance: selected?.nomAppartenance || "",
                      nomReg: formation?.nomReg || "",
                      nomDist: formation?.nomDist || "",
                      nomComm: formation?.nomComm || "",
                      nomFok: formation?.nomFok || "",
                    }));
                  }}
                >
                  <option value="">périmètre de formation</option>
                  {appartenances.map((app) => (
                    <option key={app.idAppartenance} value={app.idAppartenance}>
                      {app.nomAppartenance}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{formation.nomAppartenance}</span>
              )}
            </div> */}
            <div>
              <p>Lieu de Formation :</p>
              {isEditing ? (
                <select
                  id="input_update"
                  name="idAppartenance"
                  value={formData.idAppartenance || ""}
                  onChange={(e) => {
                    const selectedId = e.target.value
                      ? parseInt(e.target.value)
                      : "";
                    const selected = appartenances.find(
                      (a) => a.idAppartenance === selectedId
                    );

                    setFormData((prev) => ({
                      ...prev,
                      idAppartenance: selectedId,
                      nomAppartenance: selected?.nomAppartenance || "",
                    }));
                  }}
                >
                  <option value="">
                    Sélectionner un périmètre de formation
                  </option>
                  {appartenances.map((app) => (
                    <option key={app.idAppartenance} value={app.idAppartenance}>
                      {app.nomAppartenance}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{formData.nomAppartenance}</span>
              )}
            </div>
            <div>
              <p>Superviseur responsable :</p>
              {isEditing ? (
                <select
                  id="input_update"
                  name="superviseur"
                  value={formData.idSup || ""}
                  onChange={(e) => {
                    const selected = superviseurs.find(
                      (s) => s.idSup === parseInt(e.target.value)
                    );
                    setFormData((prev) => ({
                      ...prev,
                      idSup: selected?.idSup || "",
                      nomSup: selected?.nomSup || "",
                      prenomSup: selected?.prenomSup || "",
                    }));
                  }}
                >
                  <option value="">-- Sélectionner un superviseur --</option>
                  {superviseurs.map((sup) => (
                    <option key={sup.idSup} value={sup.idSup}>
                      {sup.nomSup} {sup.prenomSup}
                    </option>
                  ))}
                </select>
              ) : (
                <span>
                  {formData.nomSup} {formData.prenomSup}
                </span>
              )}
            </div>
            <div>
              <p>Technicien responsable :</p>
              {isEditing ? (
                <select
                  id="input_update"
                  name="technicien"
                  value={formData.idTech || ""}
                  onChange={(e) => {
                    const selected = techniciens.find(
                      (t) => t.idTech === parseInt(e.target.value)
                    );
                    setFormData((prev) => ({
                      ...prev,
                      idTech: selected?.idTech || "",
                      nomTech: selected?.nomTech || "",
                      prenomTech: selected?.prenomTech || "",
                    }));
                  }}
                >
                  <option value="">-- Sélectionner un technicien --</option>
                  {techniciens.map((tech) => (
                    <option key={tech.idTech} value={tech.idTech}>
                      {tech.nomTech} {tech.prenomTech}
                    </option>
                  ))}
                </select>
              ) : (
                <span>
                  {formData.nomTech} {formData.prenomTech}
                </span>
              )}
            </div>
            <section id="input_btn">
              <button
                onClick={isEditing ? handleSave : handleEditToggle}
                type="button"
              >
                <span>{isEditing ? "Valider" : "Modifier"}</span>
                <i className={`fa ${isEditing ? "fa-check" : "fa-pen"}`}></i>
              </button>
              {isEditing && (
                <button
                  onClick={handleCancel}
                  type="button"
                  style={{
                    marginLeft: "10px",
                    background: "rgba(128, 128, 128, 0.17)",
                    color: "rgba(101, 100, 100, 1)",
                    width: "100px",
                  }}
                >
                  Annuler
                </button>
              )}
            </section>
          </div>

          <div className="bas_droite" id="bas_droite_vulg">
            <div>
              <p>Nombre d'EAF encadré</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="nbrEafEncadre"
                  value={formData.nbrEafEncadre}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.nbrEafEncadre}</span>
              )}
            </div>
            <div>
              <p>Nombre de PF</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="nbrPf"
                  value={formData.nbrPf}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.nbrPf}</span>
              )}
            </div>
            <div>
              <p>Nombre de PF/CEP</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="nbrPfCep"
                  value={formData.nbrPfCep}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.nbrPfCep}</span>
              )}
            </div>
            <div>
              <p>Superficie cible</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="superficieCible"
                  value={formData.superficieCible}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.superficieCible}</span>
              )}
            </div>
            <div>
              <p>Outil de formation pour PF</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="outilFormationPf"
                  value={formData.outilFormationPf}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.outilFormationPf}</span>
              )}
            </div>
            <div>
              <p>Plaque d'identification PF</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="plaqueIdentificationPf"
                  value={formData.plaqueIdentificationPf}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.plaqueIdentificationPf}</span>
              )}
            </div>
            <div>
              <p>Fiche BPA SRA-Compost à dupliquer</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="ficheBpaSraComposte"
                  value={formData.ficheBpaSraComposte}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.ficheBpaSraComposte}</span>
              )}
            </div>
            <div>
              <p>Fiche BP post-recolte à dupliquer</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="ficheBpPostRecolte"
                  value={formData.ficheBpPostRecolte}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.ficheBpPostRecolte}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Alert_message
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        message={alertMessage}
      />
    </div>
  );
}

export default vulgarisation;
