import { useState, useEffect } from "react";
import "../css/beneficiaire.css";
import { getApportsByBeneficiaire, updateApport } from "../service/apport";
import { getAllUnites } from "../service/unite";
import Alert_message from "./alert_message";

function Apport({ setShowApport, idBenef }) {
  const [isEditing, setIsEditing] = useState(false);
  const [unites, setUnites] = useState([]);
  const [formData, setFormData] = useState({
    typeApport: "",
    quantite: "",
    idUnite: "",
    idApport: null,
    uniteMesure: "",
  });
  const [initialFormData, setInitialFormData] = useState({});
  const [alert, setAlert] = useState({ visible: false, message: "" });

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => setAlert({ visible: false, message: "" }), 5000);
  };

  console.log(idBenef);
  useEffect(() => {
    const fetchUnites = async () => {
      try {
        const data = await getAllUnites();
        setUnites(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUnites();
  }, []);

  // useEffect(() => {
  //   if (unites.length === 0) return;

  //   const fetchApport = async () => {
  //     try {
  //       const apports = await getApportsByBeneficiaire(idBenef);
  //       if (apports.length > 0) {
  //         const apport = apports[0];
  //         const idUnite = apport.unite?.idUnite || "";
  //         const unite = unites.find((u) => u.idUnite === idUnite);
  //         const initialData = {
  //           typeApport: apport.typeApport || "",
  //           quantite: apport.quantite || "",
  //           idUnite: idUnite,
  //           idApport: apport.idApport || apport.id || null,
  //           uniteMesure: unite?.uniteMesure || "",
  //         };
  //         setFormData(initialData);
  //         setInitialFormData(initialData);
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération de l'apport :", error);
  //     }
  //   };

  //   fetchApport();
  // }, [idBenef, unites]);
  // useEffect(() => {
  //   if (unites.length === 0) return;

  //   const fetchApport = async () => {
  //     try {
  //       const apports = await getApportsByBeneficiaire(idBenef);
  //       if (apports.length > 0) {
  //         const apport = apports[0];
  //         const idUnite = apport.idUnite || "";

  //         // Trouver l’unité correspondante dans la liste
  //         const unite = unites.find((u) => u.idUnite === idUnite);

  //         const initialData = {
  //           typeApport: apport.typeApport || "",
  //           quantite: apport.quantite || "",
  //           idUnite: idUnite,
  //           idApport: apport.idApport || apport.id || null,
  //           uniteMesure: unite?.uniteMesure || "",
  //         };

  //         setFormData(initialData);
  //         setInitialFormData(initialData);
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération de l'apport :", error);
  //     }
  //   };

  //   fetchApport();
  // }, [idBenef, unites]);

  useEffect(() => {
    if (unites.length === 0) return;

    const fetchApport = async () => {
      try {
        const apports = await getApportsByBeneficiaire(idBenef);
        console.log("🔍 Apports récupérés :", apports);

        // Trouver le premier apport qui a bien un idApport (même si les autres champs sont vides)
        const apport = apports.find((a) => a.idApport || a.id);

        if (apport) {
          const idApport = apport.idApport || apport.id;
          const idUnite = apport.idUnite || apport.unite?.idUnite || "";
          const unite = unites.find((u) => u.idUnite === idUnite);

          const initialData = {
            typeApport: apport.typeApport || "",
            quantite: apport.quantite || "",
            idUnite: idUnite,
            idApport: idApport,
            uniteMesure: unite?.uniteMesure || "",
          };

          console.log("✅ Apport chargé :", initialData);
          setFormData(initialData);
          setInitialFormData(initialData);
        } else {
          console.warn("❗ Aucun apport avec id trouvé !");
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération de l'apport :", error);
      }
    };

    fetchApport();
  }, [idBenef, unites]);

  useEffect(() => {
    const selectedUnite = unites.find(
      (u) => String(u.idUnite) === String(formData.idUnite)
    );
    if (selectedUnite) {
      console.log("Unité sélectionnée :", selectedUnite);
      setFormData((prev) => ({
        ...prev,
        uniteMesure: selectedUnite.uniteMesure,
      }));
    } else {
      setFormData((prev) => ({ ...prev, uniteMesure: "" }));
    }
  }, [formData.idUnite, unites]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "idUnite") {
      const selectedUnite = unites.find(
        (u) => String(u.idUnite) === String(value)
      );
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        uniteMesure: selectedUnite?.uniteMesure || "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      if (!formData.idApport) {
        console.error("⚠️ idApport est null, impossible de mettre à jour !");
        return;
      }
      try {
        await updateApport(formData.idApport, {
          typeApport: formData.typeApport,
          quantite: Number(formData.quantite),
          idUnite: formData.idUnite,
        });

        // Rafraîchir après mise à jour
        const apports = await getApportsByBeneficiaire(idBenef);
        if (apports.length > 0) {
          // const updated = apports[0];
          // const unite = unites.find(
          //   (u) => u.idUnite === updated.unite?.idUnite
          // );
          // const updatedData = {
          //   typeApport: updated.typeApport || "",
          //   quantite: updated.quantite || "",
          //   idUnite: updated.unite?.idUnite || "",
          //   idApport: updated.idApport || updated.id || null,
          //   uniteMesure: unite?.uniteMesure || "",
          // };
          const apport = apports[0];
          const idUnite = apport.idUnite || apport.unite?.idUnite || "";
          const unite = unites.find((u) => u.idUnite === idUnite);

          const updatedData = {
            typeApport: apport.typeApport || "",
            quantite: apport.quantite || "",
            idUnite: idUnite,
            idApport: apport.idApport || apport.id || null,
            uniteMesure: unite?.uniteMesure || "",
          };

          setFormData(updatedData);
          setInitialFormData(updatedData);
        }

        console.log("✅ Apport mis à jour !");
        showAlert("Apport mis à jour !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  return (
    <div id="info_perso">
      <div id="info_perso3">
        <div className="entete">
          <h3>Apport du bénéficiaire en engrais organique</h3>
          <button onClick={() => setShowApport(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="bas2">
          <div>
            <p>Type d'apport</p>
            {isEditing ? (
              <input
                id="input_update"
                type="text"
                name="typeApport"
                value={formData.typeApport}
                onChange={handleChange}
              />
            ) : (
              <span>{formData.typeApport}</span>
            )}
          </div>

          <div>
            <p>Quantité d'apport</p>
            {isEditing ? (
              <input
                id="input_update"
                type="text"
                name="quantite"
                value={formData.quantite}
                onChange={handleChange}
              />
            ) : (
              <span>{formData.quantite}</span>
            )}
          </div>

          <div>
            <p>Unité de mesure</p>
            {isEditing ? (
              <select
                id="input_update"
                name="idUnite"
                value={formData.idUnite}
                onChange={handleChange}
              >
                <option value="">Choisir une unité</option>
                {unites.map((u) => (
                  <option key={u.idUnite} value={u.idUnite}>
                    {u.uniteMesure}
                  </option>
                ))}
              </select>
            ) : (
              <span>{formData.uniteMesure}</span>
            )}
          </div>

          <section id="input_btn">
            <button onClick={handleEditToggle} type="button">
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
      </div>
      <Alert_message
        visible={alert.visible}
        message={alert.message}
        onClose={() => setAlert({ ...alert, visible: false })}
      />
    </div>
  );
}

export default Apport;
