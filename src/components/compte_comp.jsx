// import { useState } from "react";
// import "../css/compte.css";

// function compte_comp() {

//   return (
//     <div id="compte">
//       <div id="compte1">
//         <i className="fa fa-user"></i>
//         <h4>Admin central</h4>
//         <p>Modifier les informations de connexion</p>
//         <form action="">
//           <input type="text" placeholder="Nom d'utilisateur" />
//           <br />
//           <input type="password" placeholder="Ancien mot de passe" />
//           <br />
//           <input type="text" placeholder="Mot de passe" />
//           <br />
//           <input type="text" placeholder="Confirmation du mot de passe" />
//           <br />
//           <button>
//             <span>Mettre à jour</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default compte_comp;
import { useState, useEffect } from "react";
import "../css/compte.css";
import { getUserById, updateRegionUser } from "../service/userService";
import Alert_message from "../components/alert_message";

function Compte_comp() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const ADMIN_ID = 2;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(ADMIN_ID);
        setUser(data);
      } catch (err) {
        console.error(err);
        setAlertMessage("Impossible de récupérer les infos de l'admin central");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setAlertMessage("Tous les champs sont obligatoires.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlertMessage("Les mots de passe ne correspondent pas.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }

    if (newPassword === oldPassword) {
      setAlertMessage(
        "Le nouveau mot de passe doit être différent de l'ancien."
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }

    setLoading(true);
    try {
      await updateRegionUser(ADMIN_ID, {
        username: user.username,
        oldPassword,
        password: newPassword,
        regionId: null,
      });
      setAlertMessage("Mot de passe mis à jour avec succès.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setAlertMessage(err.response?.data || "Erreur lors de la mise à jour.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="compte">
      <div id="compte1">
        <i className="fa fa-user"></i>
        <h4>Admin central</h4>
        <p>Modifier les informations de connexion</p>

        {user && (
          <form onSubmit={handleSubmit}>
            <input type="text" value={user.username} disabled />
            <br />
            <input
              type="password"
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Confirmation du mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <button type="submit" disabled={loading}>
              <span>{loading ? "Mise à jour..." : "Mettre à jour"}</span>
            </button>
          </form>
        )}
      </div>

      <Alert_message
        visible={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}

export default Compte_comp;
