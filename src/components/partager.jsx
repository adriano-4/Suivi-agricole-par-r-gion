// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "../css/partager.css";
// import { useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { sendMail } from "../service/mail";

// function partager({ setShowPartager, formation }) {
//   const navigate = useNavigate();

//   console.log("📦 Données à exporter (formation) :");
//   console.table(formation);
//   const handleAnnuler = () => {
//     setShowPartager(false);
//   };

//   const handleExporter = () => {
//     try {
//       const dataToExport = Array.isArray(formation) ? formation : [formation];

//       const worksheet = XLSX.utils.json_to_sheet(dataToExport);

//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Formation");

//       const excelBuffer = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });

//       const file = new Blob([excelBuffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       saveAs(file, `formation_${Date.now()}.xlsx`);

//       console.log("✅ Exportation réussie !");
//     } catch (error) {
//       console.error("❌ Erreur lors de l’exportation :", error);
//     }
//   };
//   return (
//     <div className="partagercomp">
//       <div className="part1">
//         <h5 id="h_part">Partager les informations sur cette formation</h5>
//         <form id="form_part">
//           <div>
//             <input type="email" placeholder="Adresse e-mail du destinataire" />
//           </div>
//           <div id="choix">
//             <div>
//               <label htmlFor="vulgarisation">Vulgarisation</label>
//               <input
//                 type="checkbox"
//                 name="vulgarisation"
//                 id="vulgar"
//                 defaultChecked={true}
//               />
//             </div>
//             <div>
//               <label htmlFor="actions">Date des actions</label>
//               <input
//                 type="checkbox"
//                 name="actions"
//                 id="act"
//                 defaultChecked={true}
//               />
//             </div>
//             <div>
//               <label htmlFor="enreg">Enregister dans fichiers</label>
//               <input
//                 type="checkbox"
//                 name="enreg"
//                 id="enreg"
//                 defaultChecked={true}
//                 disabled
//               />
//             </div>
//           </div>
//         </form>
//         <p id="p_part">
//           Toutes les informations conçernant cette formation sera visible par le
//           destinataire via mail{" "}
//         </p>
//         <div className="button">
//           <button onClick={handleAnnuler} id="non2">
//             Annuler
//           </button>
//           <button onClick={handleExporter}>Exporter</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default partager;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/partager.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { sendMail } from "../service/mail";
import Alert_message from "../components/alert_message";

function Partager({ setShowPartager, formation }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ visible: false, message: "" });

  console.log("📦 Données à exporter (formation) :");
  console.table(formation);

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => setAlert({ visible: false, message: "" }), 5000);
  };

  const handleAnnuler = () => {
    setShowPartager(false);
  };

  const handleExporterEtEnvoyer = async () => {
    if (!email) {
      showAlert("Erreur lors de l'envoi du mail !");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const dataToExport = Array.isArray(formation) ? formation : [formation];
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Formation");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const file = new File([excelBuffer], `formation_${Date.now()}.xlsx`, {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(file, `formation_${Date.now()}.xlsx`);

      const response = await sendMail(email, file);
      showAlert("E-mail envoyé avec succès !");
    } catch (error) {
      console.error("❌ Erreur :", error);
      showAlert("Erreur lors de l'envoi du mail !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="partagercomp">
      <div className="part1">
        <h5 id="h_part">Partager les informations sur cette formation</h5>
        <form id="form_part" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="email"
              placeholder="Adresse e-mail du destinataire"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div id="choix">
            <div>
              <label htmlFor="vulgarisation">Vulgarisation</label>
              <input
                type="checkbox"
                name="vulgarisation"
                id="vulgar"
                defaultChecked={true}
              />
            </div>
            <div>
              <label htmlFor="actions">Date des actions</label>
              <input
                type="checkbox"
                name="actions"
                id="act"
                defaultChecked={true}
              />
            </div>
            <div>
              <label htmlFor="enreg">Enregister dans fichiers</label>
              <input
                type="checkbox"
                name="enreg"
                id="enreg"
                defaultChecked={true}
                disabled
              />
            </div>
          </div>
        </form>
        <p id="p_part">
          Toutes les informations concernant cette formation seront visibles par
          le destinataire via mail.
        </p>

        {message && <p id="message__">{message}</p>}
        <div className="button">
          <button onClick={handleAnnuler} id="non2">
            Annuler
          </button>
          <button
            style={{ width: "160px" }}
            disabled={loading || email.trim() === ""}
            className={loading || email.trim() === "" ? "disabled_envoyer" : ""}
            onClick={handleExporterEtEnvoyer}
          >
            {loading ? "Envoi en cours..." : "Exporter & Envoyer"}
          </button>
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
