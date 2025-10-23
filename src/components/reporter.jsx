import { useState } from "react";
import "../css/retarder.css";
import Alert_message from "../components/alert_message";

function reporter({ setShowReporter }) {
  const [alert, setAlert] = useState({ visible: false, message: "" });

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => {
      setAlert({ visible: false, message: "" });
    }, 5000);
  };

  const handleAnnuler = () => {
    setShowReporter(false);
  };

  return (
    <div className="reporter">
      <div className="reporter_div">
        <h5 id="h_part">Reporter une formation</h5>
        <div className="date_desc">
          <input type="date" />
          <textarea name="description" id=""></textarea>
        </div>
        <div className="button">
          <button onClick={handleAnnuler} id="non2">
            Annuler
          </button>
          <button style={{ width: "160px" }}>valider</button>
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

export default reporter;
