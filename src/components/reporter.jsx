// import { useState } from "react";
// import "../css/retarder.css";
// import Alert_message from "../components/alert_message";

// function reporter({ setShowReporter, formation }) {
//   const [alert, setAlert] = useState({ visible: false, message: "" });

//   console.log(formation.idFormation);

//   const showAlert = (message) => {
//     setAlert({ visible: true, message });
//     setTimeout(() => {
//       setAlert({ visible: false, message: "" });
//     }, 5000);
//   };

//   const handleAnnuler = () => {
//     setShowReporter(false);
//   };

//   return (
//     <div className="reporter">
//       <div className="reporter_div">
//         <h5 id="h_part">Reporter une formation</h5>
//         <div className="date_desc">
//           <div id="choix_tous">
//             <p>Nouvelle date :</p>
//           </div>
//           <input type="date" />
//           <div id="choix_tous">
//             <p>Description du cause :</p>
//           </div>
//           <textarea
//             name="description"
//             id=""
//             placeholder="Description du cause"
//           ></textarea>
//         </div>
//         <div className="button">
//           <button onClick={handleAnnuler} id="non2">
//             Annuler
//           </button>
//           <button style={{ width: "160px" }}>valider</button>
//         </div>
//       </div>
//       <Alert_message
//         visible={alert.visible}
//         message={alert.message}
//         onClose={() => setAlert({ ...alert, visible: false })}
//       />
//     </div>
//   );
// }

// export default reporter;
import { useState } from "react";
import "../css/retarder.css";
import Alert_message from "../components/alert_message";
import { updateFormation } from "../service/formation";

function Reporter({ setShowReporter, formation, refreshFormations }) {
  const [alert, setAlert] = useState({ visible: false, message: "" });
  const [date, setDate] = useState("");
  const [remarque, setRemarque] = useState("");

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => {
      setAlert({ visible: false, message: "" });
    }, 5000);
  };

  const handleAnnuler = () => {
    setShowReporter(false);
  };

  const handleValider = async () => {
    if (!date) {
      showAlert("Veuillez sélectionner une nouvelle date.");
      return;
    }

    try {
      const formattedDate = `${date}T00:00:00`;
      const formationData = {
        dateFormation: formattedDate,
        remarque: remarque,
      };

      await updateFormation(formation.idFormation, formationData);
      await refreshFormations();
      showAlert("Formation reportée avec succès !");
      setTimeout(() => {
        setShowReporter(false);
      }, 5000);
    } catch (error) {
      showAlert("Erreur lors du report de la formation.");
      console.error(error);
    }
  };

  return (
    <div className="reporter">
      <div className="reporter_div">
        <h5 id="h_part">Reporter une formation</h5>
        <div className="date_desc">
          <div id="choix_tous">
            <p>Nouvelle date :</p>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={formation.dateFormation?.split("T")[0]}
          />
          <div id="choix_tous">
            <p>Description du cause :</p>
          </div>
          <textarea
            name="description"
            placeholder="Description du cause"
            value={remarque}
            onChange={(e) => setRemarque(e.target.value)}
          ></textarea>
        </div>
        <p></p>
        <div className="button">
          <button onClick={handleAnnuler} id="non2">
            Annuler
          </button>
          <button
            style={{ width: "160px" }}
            onClick={handleValider}
            className={
              date === "" && remarque === "" ? "valider__disabled" : ""
            }
            disabled={date === "" && remarque === ""}
          >
            Valider
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

export default Reporter;
