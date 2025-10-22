import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/partager.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { sendMail } from "../service/mail";
import Alert_message from "../components/alert_message";
import Partager_reg from "./partager_reg";
import { getAllRegions } from "../service/region";

function Partager({ setShowPartager, formation }) {
  const [regions, setRegions] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ visible: false, message: "" });
  const [selectAll, setSelectAll] = useState(false);
  const [selectEmail, setSelectEmail] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => setAlert({ visible: false, message: "" }), 5000);
  };

  const handleAnnuler = () => {
    setShowPartager(false);
  };

  const handleExporterEtEnvoyer = async () => {
    if (!email) {
      showAlert("Veuillez entrer une adresse e-mail !");
      return;
    }

    try {
      setLoading(true);

      const dataToExport = (
        Array.isArray(formation) ? formation : [formation]
      ).filter((f) => selectedRegions.includes(f.nomReg));
      if (dataToExport.length === 0) {
        showAlert("Aucune formation ne correspond aux régions sélectionnées !");
        setLoading(false);
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Formation");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `formation_${Date.now()}.xlsx`);

      await sendMail(email, blob);
      showAlert("E-mail envoyé avec succès !");
      setShowPartager(false);
    } catch (error) {
      console.error("Erreur :", error);
      showAlert("Erreur lors de l'envoi du mail !");
    } finally {
      setLoading(false);
    }
  };
  const handleExporter = async () => {
    try {
      setLoading(true);
      const dataToExport = (
        Array.isArray(formation) ? formation : [formation]
      ).filter((f) => selectedRegions.includes(f.nomReg));

      if (dataToExport.length === 0) {
        showAlert("Aucune formation ne correspond aux régions sélectionnées !");
        setLoading(false);
        return;
      }
      // const dataToExport = Array.isArray(formation) ? formation : [formation];
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Formation");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `formation_${Date.now()}.xlsx`);
      showAlert("Fichier exporté avec succès !");
      setShowPartager(false);
    } catch (error) {
      console.error("Erreur :", error);
      showAlert("Erreur lors de l'export !");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueRegions = [...new Set(formation.map((f) => f.nomReg))].map(
          (nomReg) => ({ nomReg })
        );
        setRegions(uniqueRegions);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

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
    <div className="partagercomp">
      <div className="part1">
        <h5 id="h_part">Informations sur cette formation</h5>
        <form id="form_part" onSubmit={(e) => e.preventDefault()}>
          <div>
            <i
              onClick={() => setSelectEmail((prev) => !prev)}
              id="emailselect"
              className={`fa ${selectEmail ? "fa-check-circle" : "fa-circle"}`}
              style={{
                cursor: "pointer",
                fontSize: "15px",
                color: selectEmail ? "green" : "gray",
              }}
            ></i>
            <input
              type="email"
              placeholder="Adresse e-mail du destinataire"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!selectEmail}
              style={{
                opacity: selectEmail ? "1" : "0.4",
              }}
            />
          </div>
          <div id="choix_tous">
            <p>Selectionner les regions :</p>
            {/* <button>
              <i className="fa fa-check-double"></i>
            </button> */}
            <section onClick={() => setSelectAll((prev) => !prev)}>
              <label style={{ marginLeft: "8px", cursor: "pointer" }}>
                {selectAll ? "Tout désélectionner" : "Tout sélectionner"}
              </label>
              <i
                className={`fa ${selectAll ? "fa-check-circle" : "fa-circle"}`}
                style={{
                  cursor: "pointer",
                  fontSize: "13px",
                  color: selectAll ? "green" : "gray",
                }}
              ></i>
            </section>
          </div>
          <div id="reg_choix">
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
              <p>Aucune région disponible</p>
            )}
          </div>
        </form>
        {selectEmail && (
          <p id="p_part">
            Toutes les informations concernant cette formation seront visibles
            par le destinataire via mail.
          </p>
        )}

        {message && <p id="message__">{message}</p>}
        <div className="button">
          <button onClick={handleAnnuler} id="non2">
            Annuler
          </button>
          {selectEmail && (
            <button
              style={{ width: "160px" }}
              disabled={loading || email.trim() === ""}
              className={
                loading || email.trim() === "" ? "disabled_envoyer" : ""
              }
              onClick={handleExporterEtEnvoyer}
            >
              {loading ? "Envoi en cours..." : "Exporter & Envoyer"}
            </button>
          )}
          {!selectEmail && (
            <button
              style={{ width: "160px" }}
              // disabled={loading || email.trim() === ""}
              // className={
              //   loading || email.trim() === "" ? "disabled_envoyer" : ""
              // }
              onClick={handleExporter}
            >
              {loading ? "Export en cours..." : "Exporterr"}
            </button>
          )}
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

export default Partager;
