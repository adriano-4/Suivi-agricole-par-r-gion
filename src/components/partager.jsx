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
  const isRegionSelected = selectedRegions.length > 0;
  const [selectDate, setSelectDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

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

      let dataToExport = (
        Array.isArray(formation) ? formation : [formation]
      ).filter((f) => selectedRegions.includes(f.nomReg));

      if (selectDate && selectedDate) {
        dataToExport = dataToExport.filter((f) => {
          if (!f.dateFormation) return false;
          return f.dateFormation.split("T")[0] === selectedDate;
        });
      }

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
      let dataToExport = (
        Array.isArray(formation) ? formation : [formation]
      ).filter((f) => selectedRegions.includes(f.nomReg));

      if (selectDate && selectedDate) {
        dataToExport = dataToExport.filter((f) => {
          if (!f.dateFormation) return false;
          return f.dateFormation.split("T")[0] === selectedDate;
        });
      }

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const uniqueRegions = [...new Set(formation.map((f) => f.nomReg))].map(
  //         (nomReg) => ({ nomReg })
  //       );
  //       setRegions(uniqueRegions);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement des données :", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    try {
      let filteredFormations = Array.isArray(formation)
        ? formation
        : [formation];

      console.log(
        "📅 Dates et régions de formation :",
        filteredFormations.map((f) => ({
          date: f.dateFormation,
          region: f.nomReg,
        }))
      );
      if (selectDate && selectedDate) {
        filteredFormations = filteredFormations.filter((f) => {
          if (!f.dateFormation) return false;
          return f.dateFormation.split("T")[0] === selectedDate;
        });
      }

      const uniqueRegions = [
        ...new Set(filteredFormations.map((f) => f.nomReg)),
      ].map((nomReg) => ({ nomReg }));

      setRegions(uniqueRegions);
    } catch (error) {
      console.error("Erreur lors du chargement des régions :", error);
    }
  }, [formation, selectDate, selectedDate]);

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
            <p>Selection des regions :</p>
            {/* <button>
              <i className="fa fa-check-double"></i>
            </button> */}
            {isRegionSelected && (
              <section onClick={() => setSelectAll((prev) => !prev)}>
                <label style={{ marginLeft: "8px", cursor: "pointer" }}>
                  {selectAll ? "Tout désélectionner" : "Tout sélectionner"}
                </label>
                <i
                  className={`fa ${
                    selectAll ? "fa-check-circle" : "fa-circle"
                  }`}
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    color: selectAll ? "green" : "gray",
                  }}
                ></i>
              </section>
            )}
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
              <p id="aucu">Aucune région disponible</p>
            )}
          </div>
          <div id="choix_tous">
            <p>Selection de date :</p>
          </div>

          <div className="date_choix_export">
            <div>
              <i
                onClick={() => setSelectDate((prev) => !prev)}
                id="dateselect"
                className={`fa ${selectDate ? "fa-check-circle" : "fa-circle"}`}
                style={{
                  cursor: "pointer",
                  fontSize: "15px",
                  color: selectDate ? "green" : "gray",
                }}
              ></i>

              <input
                type="date"
                name="date_formation"
                id="date_formation"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                disabled={!selectDate}
                style={{
                  opacity: selectDate ? "1" : "0.4",
                }}
              />
            </div>
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
              disabled={loading || email.trim() === "" || !isRegionSelected}
              className={
                loading || email.trim() === "" || !isRegionSelected
                  ? "disabled_envoyer"
                  : ""
              }
              onClick={handleExporterEtEnvoyer}
            >
              {loading ? "Envoi en cours..." : "Exporter & Envoyer"}
            </button>
          )}
          {!selectEmail && (
            <button
              style={{ width: "160px" }}
              className={
                loading || !isRegionSelected ? "disabled_exporter" : ""
              }
              disabled={loading || !isRegionSelected}
              onClick={handleExporter}
            >
              {loading ? "Export en cours..." : "Exporter"}
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
