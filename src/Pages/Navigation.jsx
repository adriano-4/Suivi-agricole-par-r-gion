import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBarPage from "../components/navBarPage";
import NavItem from "../components/NavItem";
import Deconnecter from "../components/deconnecter";
import "../css/navigation.css";

function Navigation() {
  const location = useLocation();
  // const userRole = location.state?.role || "REGION";
  const [showDeco, setShowDeco] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const region_ = localStorage.getItem("region");
  console.log("Region de navigation :" + region_);

  return (
    <div>
      <NavBarPage setShowDeco={setShowDeco} />
      {showDeco && <Deconnecter setShowDeco={setShowDeco} />}
      <div id="navi">
        <ul>
          <NavItem to="/beneficiaire" icon="fa-users" label="Bénéficiaire" />
          <NavItem to="/formation" icon="fa-graduation-cap" label="Formation" />
          <NavItem to="/livraison" icon="fa-truck" label="Livraison" />

          {role === "ROLE_ADMIN" && (
            <>
              {/* <NavItem to="/intrant" icon="fa-seedling" label="Intrants" /> */}
              <NavItem to="/region" icon="fa-map" label="Régions" />
              <NavItem to="/compte" icon="fa-user-cog" label="Comptes" />
              <NavItem to="/responsable" icon="fa-layer-group" label="Autres" />
              <NavItem to="/suivi" icon="fa-chart-line" label="Suivi" />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
