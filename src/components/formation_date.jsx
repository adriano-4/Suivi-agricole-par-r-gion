import { useState, useEffect } from "react";
import { getSuperviseurs, getTechniciens } from "../service/responsable";
import {
  getAppartenances,
  getAppartenancesByRegion,
} from "../service/appartenance";
import { getAllRegions } from "../service/region";
import { getActions } from "../service/action";
import Alert_message from "../components/alert_message";

function formation_date({ setShowFormation, formation }) {
  const [actions, setActions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [superviseurs, setSuperviseurs] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [appartenances, setAppartenances] = useState([]);
  const [formData, setFormData] = useState({
    nomReg: formation?.nomReg || "",
    nomDist: formation?.nomDist || "",
    nomComm: formation?.nomComm || "",
    nomFok: formation?.nomFok || "",
    nomAppartenance: formation?.nomAppartenance || "",
    idAppartenance: formation?.idAppartenance || "",
    nomSup: formation?.nomSup || "",
    prenomSup: formation?.prenomSup || "",
    idSup: formation?.idSup || "",
    nomTech: formation?.nomTech || "",
    prenomTech: formation?.prenomTech || "",
    idTech: formation?.idTech || "",
  });

  useEffect(() => {
    if (formation?.idFormation) {
      getActions(formation.idFormation)
        .then((data) => setActions(data))
        .catch((err) =>
          console.error("Erreur lors du chargement des actions :", err)
        );
    }
  }, [formation?.idFormation]);

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
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

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

  const handleEditToggle = () => {
    if (isEditing) {
      if (isEditing) {
        setFormData({
          nomReg: formation?.nomReg || "",
          nomDist: formation?.nomDist || "",
          nomComm: formation?.nomComm || "",
          nomFok: formation?.nomFok || "",
          nomAppartenance: formation?.nomAppartenance || "",
          idAppartenance: formation?.idAppartenance || "",
          nomSup: formation?.nomSup || "",
          prenomSup: formation?.prenomSup || "",
          idSup: formation?.idSup || "",
          nomTech: formation?.nomTech || "",
          prenomTech: formation?.prenomTech || "",
          idTech: formation?.idTech || "",
        });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleActionDateChange = (actionId, newDate) => {
    setActions((prevActions) =>
      prevActions.map((action) =>
        action.idAction === actionId
          ? { ...action, dateAction: newDate }
          : action
      )
    );
  };

  const handleSaveActionDates = async () => {};

  const handleCancel = () => {
    if (formation?.idFormation) {
      getActions(formation.idFormation)
        .then((data) => setActions(data))
        .catch((err) =>
          console.error("Erreur lors du rechargement des actions :", err)
        );
    }
    setIsEditing(false);
  };

  const actionsGauche = actions.filter(
    (a) =>
      !a.typeAction.toLowerCase().includes("formation") &&
      !a.typeAction.toLowerCase().includes("suivi")
  );

  const actionsDroite = actions.filter(
    (a) =>
      a.typeAction.toLowerCase().includes("formation") ||
      a.typeAction.toLowerCase().includes("suivi")
  );

  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Formation</h3>
          <button onClick={() => setShowFormation(false)}>
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
                <span>{formation.nomReg}</span>
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
                <span>{formation.nomDist}</span>
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
                <span>{formation.nomComm}</span>
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
                <span>{formation.nomFok}</span>
              )}
            </div>

            <div>
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
                  {formation.nomSup} {formation.prenomSup}
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
                  {formation.nomTech} {formation.prenomTech}
                </span>
              )}
            </div>

            {/* Boutons Modifier/Valider/Annuler */}
            <section id="input_btn">
              <button
                onClick={isEditing ? handleSaveActionDates : handleEditToggle}
                type="button"
                disabled={loading}
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

            {actionsGauche.map((action, idx) => (
              <div key={idx} className="div_rond">
                <p>{action.typeAction}</p>
                {isEditing ? (
                  <input
                    id="input_update_date"
                    type="date"
                    value={
                      action.dateAction ? action.dateAction.split("T")[0] : ""
                    }
                    onChange={(e) =>
                      handleActionDateChange(action.idAction, e.target.value)
                    }
                    style={{ fontSize: "12px", padding: "2px" }}
                  />
                ) : (
                  <span style={{ fontSize: "12px" }}>
                    {action.dateAction
                      ? action.dateAction.split("T")[0]
                      : "Date non renseignée"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Actions de droite avec dates éditable en mode édition */}
          <div className="bas_droite" id="bas_droite_formation">
            <h3>Actions</h3>
            {actionsDroite.map((action, idx) => (
              <div key={idx}>
                <p>{action.typeAction}</p>
                {isEditing ? (
                  <input
                    id="input_update_date"
                    type="date"
                    value={
                      action.dateAction ? action.dateAction.split("T")[0] : ""
                    }
                    onChange={(e) =>
                      handleActionDateChange(action.idAction, e.target.value)
                    }
                    style={{ fontSize: "12px", padding: "2px" }}
                  />
                ) : (
                  <span style={{ fontSize: "12px" }}>
                    {action.dateAction
                      ? action.dateAction.split("T")[0]
                      : "Date non renseignée"}
                  </span>
                )}
              </div>
            ))}
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

export default formation_date;
