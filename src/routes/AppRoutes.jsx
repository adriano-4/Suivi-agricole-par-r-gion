import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Navigation from "../Pages/Navigation";
import Beneficiaire from "../Pages/Beneficiaire";
import Region from "../Pages/Region";
import Intrant from "../Pages/Intrant";
import Formation from "../Pages/Formation";
import Livraison from "../Pages/Livraison";
import PrivateRoute from "../Pages/PrivateRoute";
import Compte from "../Pages/Compte";
import Responsable from "../Pages/Responsable";
import Suivi from "../Pages/Suivi";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/navigation"
          element={
            <PrivateRoute>
              <Navigation />
            </PrivateRoute>
          }
        />
        <Route
          path="/beneficiaire"
          element={
            <PrivateRoute>
              <Beneficiaire />
            </PrivateRoute>
          }
        />
        <Route
          path="/intrant"
          element={
            <PrivateRoute>
              <Intrant />
            </PrivateRoute>
          }
        />
        <Route
          path="/livraison"
          element={
            <PrivateRoute>
              <Livraison />
            </PrivateRoute>
          }
        />
        <Route
          path="/formation"
          element={
            <PrivateRoute>
              <Formation />
            </PrivateRoute>
          }
        />
        <Route
          path="/region"
          element={
            <PrivateRoute>
              <Region />
            </PrivateRoute>
          }
        />
        <Route
          path="/compte"
          element={
            <PrivateRoute>
              <Compte />
            </PrivateRoute>
          }
        />
        <Route
          path="/responsable"
          element={
            <PrivateRoute>
              <Responsable />
            </PrivateRoute>
          }
        />
        <Route
          path="/suivi"
          element={
            <PrivateRoute>
              <Suivi />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
