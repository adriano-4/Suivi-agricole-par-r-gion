import NavBar from "../components/navBar";
import "../css/suivi.css";
import React, { useState, useEffect } from "react";
import Donnee from "../components/donnee";
import { getAllRegions } from "../service/region";
import Graphe from "../components/graphe";
function Suivi() {
  const [regions, setRegions] = useState([]);

  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };
  const getRandomColor = () => {
    const families = ["green", "blue", "pink"];
    const family = families[Math.floor(Math.random() * families.length)];

    let r, g, b;

    switch (family) {
      case "green":
        r = Math.floor(Math.random() * 80);
        g = Math.floor(Math.random() * 100) + 150;
        b = Math.floor(Math.random() * 80);
        break;
      case "blue":
        r = Math.floor(Math.random() * 100);
        g = Math.floor(Math.random() * 100);
        b = Math.floor(Math.random() * 100) + 150;
        break;
      case "pink":
        r = Math.floor(Math.random() * 100) + 150;
        g = Math.floor(Math.random() * 80);
        b = Math.floor(Math.random() * 100) + 150;
        break;
    }

    return `rgb(${r},${g},${b})`;
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await getAllRegions();
        const coloredRegions = data.map((region) => ({
          ...region,
          color: getRandomColor(),
        }));
        setRegions(coloredRegions);
      } catch (error) {
        console.error("Erreur lors du chargement des régions :", error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div>
      <NavBar />
      <div id="ppale_suivi">
        <div className="gauche_suivi">
          <h2>Statistique par région</h2>
          <div className="donnee__">
            {regions.length > 0 ? (
              regions.map((region, index) => (
                <Donnee key={index} region={region} />
              ))
            ) : (
              <p>Aucune région trouvée.</p>
            )}
          </div>
        </div>
        <div className="droite_suivi">
          <h2>Graphique</h2>
          <Graphe regions={regions} />
        </div>
      </div>
    </div>
  );
}

export default Suivi;
