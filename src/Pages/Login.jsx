import LoginComp from "../components/loginComp";
import { useState } from "react";
import Alert_message from "../components/alert_message";

function Login() {
  const [userRole, setUserRole] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleLoginError = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <div>
      <LoginComp setUserRole={setUserRole} onLoginError={handleLoginError} />
      <Alert_message message={"Nom d'utilisateur ou mot de passe incorrect "} visible={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  );
}

export default Login;
