import { useState, useEffect } from "react";
import {
  getIntrantsByBeneficiaire,
  updateQuantiteIntrantBeneficiaire,
} from "../service/produits";
import "../css/formation.css";
import Alert_message from "./alert_message";
import { color } from "chart.js/helpers";

function IntrantComp({ setShowIntrantComp, idBenef }) {
  const [intrants, setIntrants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    if (!idBenef) return;
    getIntrantsByBeneficiaire(idBenef)
      .then((res) => {
        setIntrants(res.data);
        setFormData(res.data.map((i) => ({ ...i })));
        setInitialData(res.data.map((i) => ({ ...i })));
      })
      .catch((err) => console.error("Erreur fetch intrants:", err));
  }, [idBenef]);

  const handleChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => setAlert({ visible: false, message: "" }), 5000);
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        for (let i = 0; i < formData.length; i++) {
          const intrant = formData[i];

          // sécurité : nombre valide
          const quantite = Number(String(intrant.quantite).replace(",", "."));

          if (!isNaN(quantite)) {
            await updateQuantiteIntrantBeneficiaire(
              idBenef,
              intrant.idIntrant,
              quantite
            );
          }
        }

        const res = await getIntrantsByBeneficiaire(idBenef);
        setIntrants(res.data);
        setFormData(res.data.map((i) => ({ ...i })));
        setInitialData(res.data.map((i) => ({ ...i })));
        showAlert("Mis à jour effectué avec succès !");

        console.log("✅ Intrants mis à jour !");
      } catch (err) {
        console.error("❌ Erreur mise à jour intrants :", err);
      }
    }

    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setFormData(initialData.map((i) => ({ ...i })));
    setIsEditing(false);
  };

  return (
    <div id="info_perso">
      <div id="info_perso3">
        <div className="entete">
          <h3>Intrants et matériels distribués</h3>
          <button onClick={() => setShowIntrantComp(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="bas2">
          {formData.length > 0 ? (
            formData.map((intrant, index) => (
              <div key={intrant.idIntrant} style={{ marginBottom: "10px" }}>
                <p>{intrant.typeIntrant}</p>
                {isEditing ? (
                  // <input
                  //   type="text"
                  //   id="input_update"
                  //   value={intrant.quantite}
                  //   onChange={(e) =>
                  //     handleChange(index, "quantite", e.target.value)
                  //   }
                  // />
                  <input
                    type="text"
                    id="input_update"
                    value={intrant.quantite}
                    onChange={(e) => {
                      const value = e.target.value.replace(",", ".");
                      if (/^\d*\.?\d*$/.test(value)) {
                        handleChange(index, "quantite", value);
                      }
                    }}
                  />
                ) : (
                  <span>
                    {intrant.quantite} {intrant.unite}
                  </span>
                )}
              </div>
            ))
          ) : (
            <p style={{ color: "red", fontSize: "12px" }}>
              Aucun intrant trouvé.
            </p>
          )}

          <section id="input_btn" style={{ marginTop: "10px" }}>
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

export default IntrantComp;
