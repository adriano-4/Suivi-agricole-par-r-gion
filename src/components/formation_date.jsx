// import { useState, useEffect } from "react";
// import { getSuperviseurs, getTechniciens } from "../service/responsable";
// import {
//   getAppartenances,
//   getAppartenancesByRegion,
// } from "../service/appartenance";
// import { getAllRegions } from "../service/region";
// import { getActions } from "../service/action";
// import { updateFormation } from "../service/formation";
// import Alert_message from "../components/alert_message";

// function formation_date({ setShowFormation, formation, onUpdateSuccess }) {
//   const [actions, setActions] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [superviseurs, setSuperviseurs] = useState([]);
//   const [techniciens, setTechniciens] = useState([]);
//   const [appartenances, setAppartenances] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [formData, setFormData] = useState({
//     nomReg: formation?.nomReg || "",
//     nomDist: formation?.nomDist || "",
//     nomComm: formation?.nomComm || "",
//     nomFok: formation?.nomFok || "",
//     nomAppartenance: formation?.nomAppartenance || "",
//     idAppartenance: formation?.idAppartenance || "",
//     nomSup: formation?.nomSup || "",
//     prenomSup: formation?.prenomSup || "",
//     idSup: formation?.idSup || "",
//     nomTech: formation?.nomTech || "",
//     prenomTech: formation?.prenomTech || "",
//     idTech: formation?.idTech || "",
//   });

//   useEffect(() => {
//     if (formation?.idFormation) {
//       getActions(formation.idFormation)
//         .then((data) => setActions(data))
//         .catch((err) =>
//           console.error("Erreur lors du chargement des actions :", err)
//         );
//     }
//   }, [formation?.idFormation]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const supRes = await getSuperviseurs();
//         const techRes = await getTechniciens();
//         setSuperviseurs(supRes.data || supRes);
//         setTechniciens(techRes.data || techRes);
//       } catch (error) {
//         console.error(
//           "Erreur lors du chargement des superviseurs/techniciens :",
//           error
//         );
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchRegions = async () => {
//       try {
//         const data = await getAllRegions();
//         setRegions(data);
//       } catch (error) {
//         console.error("Erreur lors du chargement des régions :", error);
//       }
//     };
//     fetchRegions();
//   }, []);

//   useEffect(() => {
//     const fetchAppartenances = async () => {
//       try {
//         let regionName = localStorage.getItem("region");

//         if (regionName?.startsWith('"') && regionName.endsWith('"')) {
//           regionName = regionName.slice(1, -1);
//         }

//         let data = [];

//         if (regionName && regionName.trim() !== "") {
//           const allRegions = await getAllRegions();
//           const matchedRegion = allRegions.find(
//             (reg) =>
//               reg.nomReg.toLowerCase().trim() ===
//               regionName.toLowerCase().trim()
//           );

//           if (matchedRegion && matchedRegion.id) {
//             data = await getAppartenancesByRegion(matchedRegion.id);
//           } else {
//             console.warn("Aucune région trouvée avec ce nom :", regionName);
//             data = [];
//           }
//         } else {
//           data = await getAppartenances();
//         }

//         setAppartenances(data);
//       } catch (error) {
//         console.error("Erreur lors du chargement des appartenances :", error);
//         showAlert("Erreur lors du chargement des appartenances");
//       }
//     };

//     fetchAppartenances();
//   }, []);

//   useEffect(() => {
//     if (formation && appartenances.length > 0) {
//       const currentAppartenance = appartenances.find(
//         (app) =>
//           app.idAppartenance === formation.idAppartenance ||
//           app.nomAppartenance === formation.nomAppartenance
//       );

//       setFormData((prev) => ({
//         ...prev,
//         ...formation,
//         idAppartenance:
//           currentAppartenance?.idAppartenance || formation.idAppartenance || "",
//       }));
//     }
//   }, [formation, appartenances]);

//   useEffect(() => {
//     if (alertVisible) {
//       const timer = setTimeout(() => {
//         setAlertVisible(false);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [alertVisible]);

//   const handleEditToggle = () => {
//     if (isEditing) {
//       setFormData({
//         nomReg: formation?.nomReg || "",
//         nomDist: formation?.nomDist || "",
//         nomComm: formation?.nomComm || "",
//         nomFok: formation?.nomFok || "",
//         nomAppartenance: formation?.nomAppartenance || "",
//         idAppartenance: formation?.idAppartenance || "",
//         nomSup: formation?.nomSup || "",
//         prenomSup: formation?.prenomSup || "",
//         idSup: formation?.idSup || "",
//         nomTech: formation?.nomTech || "",
//         prenomTech: formation?.prenomTech || "",
//         idTech: formation?.idTech || "",
//       });
//     }
//     setIsEditing(!isEditing);
//   };

//   const handleActionDateChange = (actionId, newDate) => {
//     setActions((prevActions) =>
//       prevActions.map((action) =>
//         action.idAction === actionId
//           ? { ...action, dateAction: newDate }
//           : action
//       )
//     );
//   };

//   const handleSaveActionDates = async () => {
//     try {
//       setLoading(true);

//       if (!formData.idAppartenance) {
//         setAlertMessage("Erreur : Veuillez sélectionner un lieu de formation");
//         setAlertVisible(true);
//         return;
//       }

//       const formationData = {
//         idTech: formData.idTech,
//         idSup: formData.idSup,
//         idAppartenance: formData.idAppartenance,
//         dateFormation: formation.dateFormation,
//         remarque: formation.remarque || "",
//       };

//       await updateFormation(formation.idFormation, formationData);

//       setAlertMessage("Mise à jour réussie !");
//       setAlertVisible(true);

//       setIsEditing(false);
//       if (onUpdateSuccess) {
//         onUpdateSuccess();
//       }
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour :", error);
//       setAlertMessage("Échec de la mise à jour. Veuillez réessayer.");
//       setAlertVisible(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     // Reset form data
//     setFormData({
//       nomReg: formation?.nomReg || "",
//       nomDist: formation?.nomDist || "",
//       nomComm: formation?.nomComm || "",
//       nomFok: formation?.nomFok || "",
//       nomAppartenance: formation?.nomAppartenance || "",
//       idAppartenance: formation?.idAppartenance || "",
//       nomSup: formation?.nomSup || "",
//       prenomSup: formation?.prenomSup || "",
//       idSup: formation?.idSup || "",
//       nomTech: formation?.nomTech || "",
//       prenomTech: formation?.prenomTech || "",
//       idTech: formation?.idTech || "",
//     });

//     if (formation?.idFormation) {
//       getActions(formation.idFormation)
//         .then((data) => setActions(data))
//         .catch((err) =>
//           console.error("Erreur lors du rechargement des actions :", err)
//         );
//     }
//     setIsEditing(false);
//   };

//   const showAlert = (message) => {
//     setAlertMessage(message);
//     setAlertVisible(true);
//   };

//   const actionsGauche = actions.filter(
//     (a) =>
//       !a.typeAction.toLowerCase().includes("formation") &&
//       !a.typeAction.toLowerCase().includes("suivi")
//   );

//   const actionsDroite = actions.filter(
//     (a) =>
//       a.typeAction.toLowerCase().includes("formation") ||
//       a.typeAction.toLowerCase().includes("suivi")
//   );

//   return (
//     <div id="info_perso">
//       <div id="info_perso2">
//         <div className="entete">
//           <h3>Formation</h3>
//           <button onClick={() => setShowFormation(false)}>
//             <i className="fa fa-plus"></i>
//           </button>
//         </div>
//         <div className="bas">
//           <div className="bas_gauche">
//             <div>
//               <p>Region :</p>
//               {isEditing ? (
//                 <input
//                   id="input_update"
//                   type="text"
//                   value={formData.nomReg}
//                   readOnly
//                 />
//               ) : (
//                 <span>{formData.nomReg}</span>
//               )}
//             </div>

//             <div>
//               <p>District :</p>
//               {isEditing ? (
//                 <input
//                   id="input_update"
//                   type="text"
//                   value={formData.nomDist}
//                   readOnly
//                 />
//               ) : (
//                 <span>{formData.nomDist}</span>
//               )}
//             </div>

//             <div>
//               <p>Commune :</p>
//               {isEditing ? (
//                 <input
//                   id="input_update"
//                   type="text"
//                   value={formData.nomComm}
//                   readOnly
//                 />
//               ) : (
//                 <span>{formData.nomComm}</span>
//               )}
//             </div>

//             <div>
//               <p>Fokontany :</p>
//               {isEditing ? (
//                 <input
//                   id="input_update"
//                   type="text"
//                   value={formData.nomFok}
//                   readOnly
//                 />
//               ) : (
//                 <span>{formData.nomFok}</span>
//               )}
//             </div>

//             <div>
//               <p>Lieu de Formation :</p>
//               {isEditing ? (
//                 <select
//                   id="input_update"
//                   name="idAppartenance"
//                   value={formData.idAppartenance || ""}
//                   onChange={(e) => {
//                     const selectedId = e.target.value
//                       ? parseInt(e.target.value)
//                       : "";
//                     const selected = appartenances.find(
//                       (a) => a.idAppartenance === selectedId
//                     );

//                     setFormData((prev) => ({
//                       ...prev,
//                       idAppartenance: selectedId,
//                       nomAppartenance: selected?.nomAppartenance || "",
//                     }));
//                   }}
//                 >
//                   <option value="">
//                     Sélectionner un périmètre de formation
//                   </option>
//                   {appartenances.map((app) => (
//                     <option key={app.idAppartenance} value={app.idAppartenance}>
//                       {app.nomAppartenance}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <span>{formData.nomAppartenance}</span>
//               )}
//             </div>

//             <div>
//               <p>Superviseur responsable :</p>
//               {isEditing ? (
//                 <select
//                   id="input_update"
//                   name="superviseur"
//                   value={formData.idSup || ""}
//                   onChange={(e) => {
//                     const selected = superviseurs.find(
//                       (s) => s.idSup === parseInt(e.target.value)
//                     );
//                     setFormData((prev) => ({
//                       ...prev,
//                       idSup: selected?.idSup || "",
//                       nomSup: selected?.nomSup || "",
//                       prenomSup: selected?.prenomSup || "",
//                     }));
//                   }}
//                 >
//                   <option value="">-- Sélectionner un superviseur --</option>
//                   {superviseurs.map((sup) => (
//                     <option key={sup.idSup} value={sup.idSup}>
//                       {sup.nomSup} {sup.prenomSup}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <span>
//                   {formData.nomSup} {formData.prenomSup}
//                 </span>
//               )}
//             </div>

//             <div>
//               <p>Technicien responsable :</p>
//               {isEditing ? (
//                 <select
//                   id="input_update"
//                   name="technicien"
//                   value={formData.idTech || ""}
//                   onChange={(e) => {
//                     const selected = techniciens.find(
//                       (t) => t.idTech === parseInt(e.target.value)
//                     );
//                     setFormData((prev) => ({
//                       ...prev,
//                       idTech: selected?.idTech || "",
//                       nomTech: selected?.nomTech || "",
//                       prenomTech: selected?.prenomTech || "",
//                     }));
//                   }}
//                 >
//                   <option value="">-- Sélectionner un technicien --</option>
//                   {techniciens.map((tech) => (
//                     <option key={tech.idTech} value={tech.idTech}>
//                       {tech.nomTech} {tech.prenomTech}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <span>
//                   {formData.nomTech} {formData.prenomTech}
//                 </span>
//               )}
//             </div>

//             {/* Boutons Modifier/Valider/Annuler */}
//             <section id="input_btn">
//               <button
//                 onClick={isEditing ? handleSaveActionDates : handleEditToggle}
//                 type="button"
//                 disabled={loading}
//               >
//                 <span>{isEditing ? "Valider" : "Modifier"}</span>
//                 <i className={`fa ${isEditing ? "fa-check" : "fa-pen"}`}></i>
//               </button>
//               {isEditing && (
//                 <button
//                   onClick={handleCancel}
//                   type="button"
//                   style={{
//                     marginLeft: "10px",
//                     background: "rgba(128, 128, 128, 0.17)",
//                     color: "rgba(101, 100, 100, 1)",
//                     width: "100px",
//                   }}
//                 >
//                   Annuler
//                 </button>
//               )}
//             </section>

//             {actionsGauche.map((action, idx) => (
//               <div key={idx} className="div_rond">
//                 <p>{action.typeAction}</p>
//                 {isEditing ? (
//                   <input
//                     id="input_update_date"
//                     type="date"
//                     value={
//                       action.dateAction ? action.dateAction.split("T")[0] : ""
//                     }
//                     onChange={(e) =>
//                       handleActionDateChange(action.idAction, e.target.value)
//                     }
//                     style={{ fontSize: "12px", padding: "2px" }}
//                   />
//                 ) : (
//                   <span style={{ fontSize: "12px" }}>
//                     {action.dateAction
//                       ? action.dateAction.split("T")[0]
//                       : "Date non renseignée"}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Actions de droite avec dates éditable en mode édition */}
//           <div className="bas_droite" id="bas_droite_formation">
//             <h3>Actions</h3>
//             {actionsDroite.map((action, idx) => (
//               <div key={idx}>
//                 <p>{action.typeAction}</p>
//                 {isEditing ? (
//                   <input
//                     id="input_update_date"
//                     type="date"
//                     value={
//                       action.dateAction ? action.dateAction.split("T")[0] : ""
//                     }
//                     onChange={(e) =>
//                       handleActionDateChange(action.idAction, e.target.value)
//                     }
//                     style={{ fontSize: "12px", padding: "2px" }}
//                   />
//                 ) : (
//                   <span style={{ fontSize: "12px" }}>
//                     {action.dateAction
//                       ? action.dateAction.split("T")[0]
//                       : "Date non renseignée"}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Alert_message
//         visible={alertVisible}
//         onClose={() => setAlertVisible(false)}
//         message={alertMessage}
//       />
//     </div>
//   );
// }

// export default formation_date;
import { useState, useEffect } from "react";
import { getSuperviseurs, getTechniciens } from "../service/responsable";
import {
  getAppartenances,
  getAppartenancesByRegion,
} from "../service/appartenance";
import { getAllRegions } from "../service/region";
import { getActions } from "../service/action";
import { updateFormation } from "../service/formation";
import { updateActionDate } from "../service/action"; // Import de la fonction pour mettre à jour les dates d'actions
import Alert_message from "../components/alert_message";

function formation_date({ setShowFormation, formation, onUpdateSuccess }) {
  const [actions, setActions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [superviseurs, setSuperviseurs] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [appartenances, setAppartenances] = useState([]);
  const [regions, setRegions] = useState([]);
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

  const handleEditToggle = () => {
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

  const handleSaveActionDates = async () => {
    try {
      setLoading(true);

      if (!formData.idAppartenance) {
        setAlertMessage("Erreur : Veuillez sélectionner un lieu de formation");
        setAlertVisible(true);
        return;
      }

      // Mise à jour de la formation
      const formationData = {
        idTech: formData.idTech,
        idSup: formData.idSup,
        idAppartenance: formData.idAppartenance,
        dateFormation: formation.dateFormation,
        remarque: formation.remarque || "",
      };

      await updateFormation(formation.idFormation, formationData);

      // Mise à jour des dates des actions
      const actionUpdates = actions.map(async (action) => {
        if (action.dateAction) {
          const actionData = {
            idFormation: formation.idFormation,
            dateAction: action.dateAction,
          };
          await updateActionDate(action.idAction, actionData);
        }
      });

      await Promise.all(actionUpdates);

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
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data
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

    // Recharger les actions pour réinitialiser les dates
    if (formation?.idFormation) {
      getActions(formation.idFormation)
        .then((data) => setActions(data))
        .catch((err) =>
          console.error("Erreur lors du rechargement des actions :", err)
        );
    }
    setIsEditing(false);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
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
