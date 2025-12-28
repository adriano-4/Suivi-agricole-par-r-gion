import "../css/alert.css";

function Alert_message({ visible, onClose, message }) {
  if (!visible) return null;

  return (
    <div id="alert_mess">
      <div id="aler">
        <div id="message">
          <i id="info_icon" className="fa fa-info"></i> <h3>{message}</h3>
        </div>
        <div id="button_mess">
          <button onClick={onClose}>OK</button>
        </div>
      </div>
      <div id="chargement"></div>
    </div>
  );
}

export default Alert_message;
