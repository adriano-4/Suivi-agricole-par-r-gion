import { updateBeneficiaire } from "../service/beneficiaire";
import { useState, useEffect } from "react";
import {
  getAppartenances,
  getAppartenancesByRegion,
} from "../service/appartenance";
import "../css/beneficiaire.css";
import Alert_message from "../components/alert_message";
import { getAllRegions } from "../service/region";

function Info_perso({ setShowInfo, beneficiaire }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nomBenef: beneficiaire.nomBenef || "",
    prenomBenef: beneficiaire.prenomBenef || "",
    surnomBenef: beneficiaire.surnomBenef || "",
    cin: beneficiaire.cin || "",
    genre: beneficiaire.genre || "",
    datnais: beneficiaire.datnais || "",
    lieunais: beneficiaire.lieunais || "",
    situationMat: beneficiaire.situationMat || "",
    nomConjoint: beneficiaire.nomConjoint || "",
    contact: beneficiaire.contact || "",
    nomReg: beneficiaire.nomReg || "",
    nomDist: beneficiaire.nomDist || "",
    nomComm: beneficiaire.nomComm || "",
    nomFok: beneficiaire.nomFok || "",
    idAppartenance: beneficiaire.idAppartenance || "",
    nomAppartenance: beneficiaire.nomAppartenance || "",
    supTotPrec: beneficiaire.supTotPrec || "",
    rendementPrec: beneficiaire.rendementPrec || "",
    varieteRiz: beneficiaire.varieteRiz || "",
    supTotActuelle: beneficiaire.supTotActuelle || "",
    supFSRPActuelle: beneficiaire.supFSRPActuelle || "",
  });
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [appartenances, setAppartenances] = useState([]);
  const anneePrecedente = new Date().getFullYear() - 1;
  const anneeActuelle = new Date().getFullYear();

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

  // useEffect(() => {
  //   const fetchAppartenances = async () => {
  //     try {
  //       const data = await getAppartenances();
  //       setAppartenances(data);
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de la récupération des appartenances :",
  //         error
  //       );
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData({
      ...beneficiaire,
      datnais: beneficiaire.datnais ? beneficiaire.datnais.split("T")[0] : "",
    });
  }, [beneficiaire]);

  // const handleEditToggle = async () => {
  //   if (isEditing) {
  //     setLoading(true);
  //     try {
  //       // Ajoute l'heure si non présente
  //       const dateAvecHeure = formData.datnais.includes("T")
  //         ? formData.datnais
  //         : `${formData.datnais}T00:00:00`;

  //       // const updateData = {
  //       //   beneficiaire: {
  //       //     nom: formData.nomBenef,
  //       //     prenom: formData.prenomBenef,
  //       //     surnom: formData.surnomBenef,
  //       //     cin: formData.cin,
  //       //     genre: formData.genre,
  //       //     dateNaissance: dateAvecHeure, // ✅ Envoi complet avec l'heure
  //       //     lieuNaissance: formData.lieunais,
  //       //     situationMatrimoniale: formData.situationMat,
  //       //     nomConjoint: formData.nomConjoint,
  //       //     contact: formData.contact,
  //       //   },
  //       //   campagne: {
  //       //     supTotPrec: formData.supTotPrec,
  //       //     rendementPrec: formData.rendementPrec,
  //       //     varieteRiz: formData.varieteRiz,
  //       //     supTotActuelle: formData.supTotActuelle,
  //       //     supFsrpActuelle: formData.supFSRPActuelle,
  //       //   },
  //       //   idAppartenance: formData.idAppartenance,
  //       // };

  //       const updateData = {
  //         beneficiaire: {
  //           nom: formData.nomBenef,
  //           prenom: formData.prenomBenef,
  //           surnom: formData.surnomBenef,
  //           cin: formData.cin,
  //           genre: formData.genre,
  //           dateNaissance: dateAvecHeure,
  //           lieuNaissance: formData.lieunais,
  //           situationMatrimoniale: formData.situationMat,
  //           nomConjoint: formData.nomConjoint,
  //           contact: formData.contact,
  //           remarqueSup: "",
  //           appartenance: {
  //             idAppartenance: parseInt(formData.idAppartenance, 10),
  //           },
  //         },
  //         campagne: {
  //           supTotPrec: parseFloat(formData.supTotPrec) || 0,
  //           rendementPrec: parseFloat(formData.rendementPrec) || 0,
  //           varieteRiz: formData.varieteRiz,
  //           supTotActuelle: parseFloat(formData.supTotActuelle) || 0,
  //           supFsrpActuelle: parseFloat(formData.supFSRPActuelle) || 0,
  //         },
  //       };

  //       const updatedBenef = await updateBeneficiaire(
  //         beneficiaire.idBenef,
  //         updateData
  //       );

  //       setFormData({
  //         ...formData,
  //         ...updatedBenef,
  //         datnais: updatedBenef.dateNaissance
  //           ? updatedBenef.dateNaissance.split("T")[0]
  //           : formData.datnais,
  //       });

  //       setAlertMessage("Mise à jour effectuée avec succès !");
  //       setAlertVisible(true);
  //       setTimeout(() => {
  //         setAlertVisible(false);
  //       }, 5000);
  //     } catch (error) {
  //       console.error("Erreur lors de la mise à jour :", error);
  //       setAlertMessage("Erreur lors de la mise à jour !");
  //       setAlertVisible(true);
  //       setTimeout(() => {
  //         setAlertVisible(false);
  //       }, 5000);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   setIsEditing(!isEditing);
  // };

  const handleEditToggle = async () => {
    if (isEditing) {
      setLoading(true);
      try {
        const dateAvecHeure = formData.datnais.includes("T")
          ? formData.datnais
          : `${formData.datnais}T00:00:00`;

        const updateData = {
          beneficiaire: {
            nom: formData.nomBenef,
            prenom: formData.prenomBenef,
            surnom: formData.surnomBenef,
            cin: formData.cin,
            genre: formData.genre,
            dateNaissance: dateAvecHeure,
            lieuNaissance: formData.lieunais,
            situationMatrimoniale: formData.situationMat,
            nomConjoint: formData.nomConjoint,
            contact: formData.contact,
            remarqueSup: "",
            appartenance: {
              idAppartenance: parseInt(formData.idAppartenance, 10),
            },
          },
          campagne: {
            supTotPrec: parseFloat(formData.supTotPrec) || 0,
            rendementPrec: parseFloat(formData.rendementPrec) || 0,
            varieteRiz: formData.varieteRiz,
            supTotActuelle: parseFloat(formData.supTotActuelle) || 0,
            supFsrpActuelle: parseFloat(formData.supFSRPActuelle) || 0,
          },
        };
        const updatedBenef = await updateBeneficiaire(
          beneficiaire.idBenef,
          updateData
        );

        setFormData({
          ...formData,
          ...updatedBenef,
          datnais: updatedBenef.dateNaissance
            ? updatedBenef.dateNaissance.split("T")[0]
            : formData.datnais,
        });

        setAlertMessage("Mise à jour effectuée avec succès !");
        setAlertVisible(true);

        setTimeout(() => {
          setIsEditing(false);
        }, 1500);
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        setAlertMessage("Erreur lors de la mise à jour !");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 5000);
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditing(!isEditing);
    }
  };

  // const handleEditToggle = async () => {
  //   if (isEditing) {
  //     setLoading(true);
  //     try {
  //       const updateData = {
  //         beneficiaire: {
  //           nom: formData.nomBenef,
  //           prenom: formData.prenomBenef,
  //           surnom: formData.surnomBenef,
  //           cin: formData.cin,
  //           genre: formData.genre,
  //           dateNaissance: formData.datnais,
  //           lieuNaissance: formData.lieunais,
  //           situationMatrimoniale: formData.situationMat,
  //           nomConjoint: formData.nomConjoint,
  //           contact: formData.contact,
  //         },
  //         campagne: {
  //           supTotPrec: formData.supTotPrec,
  //           rendementPrec: formData.rendementPrec,
  //           varieteRiz: formData.varieteRiz,
  //           supTotActuelle: formData.supTotActuelle,
  //           supFsrpActuelle: formData.supFSRPActuelle,
  //         },
  //         idAppartenance: formData.idAppartenance,
  //       };

  //       await updateBeneficiaire(beneficiaire.idBenef, updateData);
  //       setFormData({ ...formData });
  //     } catch (error) {
  //       console.error("Erreur lors de la mise à jour :", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   setIsEditing(!isEditing);
  // };

  const handleCancel = () => {
    setFormData({ ...beneficiaire });
    setIsEditing(false);
  };

  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Informations personnelles</h3>
          <button onClick={() => setShowInfo(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="bas">
          <div className="bas_gauche">
            {/* Infos personnelles */}
            <div>
              <p>Nom :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="nomBenef"
                  value={formData.nomBenef}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.nomBenef}</span>
              )}
            </div>
            <div>
              <p>Prénom :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="prenomBenef"
                  value={formData.prenomBenef}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.prenomBenef}</span>
              )}
            </div>
            <div>
              <p>Surnom :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="surnomBenef"
                  value={formData.surnomBenef}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.surnomBenef}</span>
              )}
            </div>
            <div>
              <p>CIN :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="cin"
                  value={formData.cin}
                  onChange={handleChange}
                  maxLength={12}
                  pattern="\d*"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                />
              ) : (
                <span>{formData.cin}</span>
              )}
            </div>
            {/* <div>
              <p>Genre :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.genre}</span>
              )}
            </div> */}
            <div>
              <p>Genre :</p>
              {isEditing ? (
                <select
                  id="input_update"
                  name="genre"
                  value={formData.genre || ""}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              ) : (
                <span>
                  {formData.genre === "M"
                    ? "Masculin"
                    : formData.genre === "F"
                    ? "Féminin"
                    : ""}
                </span>
              )}
            </div>

            <div>
              <p>Date de naissance :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="date"
                  name="datnais"
                  value={formData.datnais}
                  onChange={handleChange}
                />
              ) : (
                <span>
                  {formData.datnais ? formData.datnais.split("T")[0] : ""}
                </span>
              )}
            </div>

            <div>
              <p>Lieu de naissance :</p>
              {isEditing ? (
                <input
                  type="text"
                  id="input_update"
                  name="lieunais"
                  value={formData.lieunais}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.lieunais}</span>
              )}
            </div>
            <div>
              <p>Situation Matrimoniale :</p>
              {isEditing ? (
                <select
                  id="input_update"
                  name="situationMat"
                  value={formData.situationMat || ""}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Célibataire">Célibataire</option>
                  <option value="Marié(e)">Marié(e)</option>
                </select>
              ) : (
                <span>{formData.situationMat}</span>
              )}
            </div>

            <div>
              <p>Nom du conjoint(e) :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
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
              ) : (
                <span>{formData.nomConjoint}</span>
              )}
            </div>

            <div>
              <p>Contact :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.contact}</span>
              )}
            </div>
            <div>
              <p>Region :</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="nomReg"
                  value={formData.nomReg}
                  onChange={handleChange}
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
                  name="nomDist"
                  value={formData.nomDist}
                  onChange={handleChange}
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
                  name="nomComm"
                  value={formData.nomComm}
                  onChange={handleChange}
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
                  name="nomFok"
                  value={formData.nomFok}
                  onChange={handleChange}
                  readOnly
                />
              ) : (
                <span>{formData.nomFok}</span>
              )}
            </div>

            {/* <div>
              <p>Adresse :</p>
              {isEditing ? (
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse || ""}
                  onChange={handleChange}
                />
              ) : (
                <span>{beneficiaire.adresse}</span>
              )}
            </div> */}
            <div>
              <p>Périmètre d'appartenance :</p>
              {isEditing ? (
                <select
                  id="input_update"
                  name="idAppartenance"
                  value={formData.idAppartenance || ""}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner --</option>
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

            {/* <div>
              <p>Nom d'AUE d'appartenance :</p>
              {isEditing ? (
                <input
                  type="text"
                  name="nomAue"
                  value={formData.nomAue}
                  onChange={handleChange}
                />
              ) : (
                <span>{beneficiaire.nomAue}</span>
              )}
            </div> */}

            {/* Boutons */}
            <section id="input_btn">
              <button
                onClick={handleEditToggle}
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
          </div>

          {/* Partie campagne */}
          <div className="bas_droite">
            <h3>Campagne Précédente ({anneePrecedente})</h3>
            <div>
              <p>Superficie Totale</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="supTotPrec"
                  value={formData.supTotPrec}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.supTotPrec}</span>
              )}
            </div>
            <div>
              <p>Rendement</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="rendementPrec"
                  value={formData.rendementPrec}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.rendementPrec}</span>
              )}
            </div>
            <div>
              <p>Variété cultivée</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="varieteRiz"
                  value={formData.varieteRiz}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.varieteRiz}</span>
              )}
            </div>

            <h3>Campagne Actuelle ({anneeActuelle})</h3>
            <div>
              <p>Superficie Totale</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="supTotActuelle"
                  value={formData.supTotActuelle}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.supTotActuelle}</span>
              )}
            </div>
            <div>
              <p>Superficie FSRP</p>
              {isEditing ? (
                <input
                  id="input_update"
                  type="text"
                  name="supFSRPActuelle"
                  value={formData.supFSRPActuelle}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.supFSRPActuelle}</span>
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

export default Info_perso;
