import { useState } from "react";
import "../css/loginAdmin.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/authService";

function loginComp({ setUserRole, onLoginError }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [regionChoice, setRegionChoice] = useState("regions");
  const [selectedRegion, setSelectedRegion] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const role = regionChoice === "central" ? "ROLE_ADMIN" : "ROLE_REGION";
  //     const data = await loginUser(username, password, role);

  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("role", data.role);
  //     if (data.region) {
  //       localStorage.setItem("region", JSON.stringify(data.region));
  //     }

  //     setUserRole(data.role);

  //     // navigate("/navigation", { state: { role: data.role } });
  //     navigate("/navigation");
  //   } catch (err) {
  //     console.error("Login failed:", err);
  //     alert("Nom d'utilisateur ou mot de passe incorrect");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);

      localStorage.setItem("user", username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.region) {
        localStorage.setItem("region", JSON.stringify(data.region));
      }

      setUserRole(data.role);
      navigate("/navigation");
    } catch (err) {
      console.error("Login failed:", err);
      onLoginError();
    }
  };

  return (
    <div className="centre">
      <div className="centre1" id="centre2">
        <form action="" onSubmit={handleSubmit}>
          {/* <select
            value={regionChoice}
            onChange={(e) => setRegionChoice(e.target.value)}
          >
            <option value="regions">Régions</option>
            <option value="central">Central</option>
          </select> */}

          <br />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          {/* {regionChoice === "regions" && (
            <select name="fitovinany" id="fitovinany">
              <option value="fitovinany">FITOVINANY</option>
              <option value="atsimo">ATSIMO-ATSINANANA</option>
              <option value="vatovavy">VATOVAVY</option>
              <option value="haute-matsiatra">HAUTE MATSIATRA</option>
            </select>
          )} */}
          <br />
          {password && (
            <i
              id="eye"
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePasswordVisibility}
            ></i>
          )}

          <button type="submit">
            Continuer <i className="fa fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default loginComp;
