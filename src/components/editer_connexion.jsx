import { useState, useEffect } from "react";
import "../css/editer.css";
import {
  addRegionUser,
  updateRegionUser,
  getUserByRegion,
} from "../service/userService";
import Alert_message from "../components/alert_message"; // import ton alert

function Editer_connexion({ region, onClose }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const existingUser = await getUserByRegion(region.id);
        if (existingUser) {
          setUser(existingUser);
          setUsername(existingUser.username);
          setPassword(existingUser.password);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [region.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (user) {
        await updateRegionUser(user.id, {
          username,
          password,
          regionId: region.id,
        });
      } else {
        await addRegionUser({ username, password, regionId: region.id });
      }

      setAlertMessage("Infos de connexion mises à jour avec succès !");
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
        onClose();
      }, 5000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="black_ed">
      <div id="ed_">
        <h3>
          {user ? "Modifier" : "Ajouter"} les informations de connexion pour{" "}
          {region.nomReg}
        </h3>
        <form onSubmit={handleSubmit}>
          <div id="input_ed">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!user}
            />
          </div>
          {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
          <div id="btn_ed">
            <button type="button" id="annuler_" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "En cours..." : "Valider"}
            </button>
          </div>
        </form>
      </div>

      <Alert_message
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </div>
  );
}

export default Editer_connexion;
