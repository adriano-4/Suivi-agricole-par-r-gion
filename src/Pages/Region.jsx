// import NavBar from "../components/navBar";
// import "../css/region.css";
// import MadagascarMap from "../components/MadagascarMap";
// import Regionbtn from "../components/regionbtn";
// import Region_comp from "../components/region_comp";
// import Ajout_region from "../components/ajout_region";
// import Suppression from "../components/suppression";
// import { getAllRegions } from "../service/region";
// import React, { useState, useEffect } from "react";

// function Region() {
//   const [showReg, setShowReg] = useState(false);
//   const [selectedRegion, setSelectedRegion] = useState(null);
//   const [showAjoutReg, setShowAjout_reg] = useState(false);
//   const [showSupCrud, setShowSupCrud] = useState(false);
//   const [regions, setRegions] = useState([]);

//   useEffect(() => {
//     getAllRegions()
//       .then((data) => {
//         const mapped = data.map((r) => ({
//           id: r.id,
//           nomReg: r.nomReg,
//           idRegRef: r.regionref?.idRegRef,
//           nomRegRef: r.regionref?.nomRegRef,
//           latitude: r.regionref?.latitude,
//           longitude: r.regionref?.longitude,
//         }));
//         setRegions(mapped);
//         console.log("Regions avec coordonnées :", mapped);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   useEffect(() => {
//     if (selectedRegion) {
//       console.log(
//         "🧠 useEffect : région sélectionnée = ",
//         selectedRegion.nomReg
//       );
//     }
//   }, [selectedRegion]);

//   return (
//     <div>
//       <NavBar />
//       <div id="gauche">
//         <h2>
//           <span>Affichage sur carte</span>
//         </h2>
//         <div className="madareg">
//           <MadagascarMap
//             regions={regions}
//             selectedRegion={selectedRegion}
//             onRegionClick={handleRegionClick}
//           />
//         </div>
//       </div>

//       <div id="droite">
//         <div className="nouv_reg">
//           <h2>
//             <span>Regions Concernés ({regions.length} régions)</span>
//           </h2>
//           <button id="ajouter_reg" onClick={() => setShowAjout_reg(true)}>
//             <span>Nouvelle région</span>
//             <i className="fa fa-plus"></i>
//           </button>
//         </div>

//         <div className="madareg2">
//           {regions.map((reg) => (
//             <Regionbtn
//               key={reg.id}
//               region={reg}
//               setShowSupCrud={setShowSupCrud}
//               setShowReg={() => {
//                 setSelectedRegion(reg);
//                 setShowReg(true);
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {showReg && selectedRegion && (
//         <Region_comp
//           regionId={selectedRegion?.id}
//           region={selectedRegion}
//           setShowReg={setShowReg}
//         />
//       )}

//       {showAjoutReg && <Ajout_region setShowAjout_reg={setShowAjout_reg} />}
//       {showSupCrud && (
//         <Suppression
//           titre_sup="region"
//           texte=" Y compris tous les éléments qui sont concernés."
//           setShowSupCrud={setShowSupCrud}
//         />
//       )}
//     </div>
//   );
// }

// export default Region;
import NavBar from "../components/navBar";
import "../css/region.css";
import MadagascarMap from "../components/MadagascarMap";
import Regionbtn from "../components/regionbtn";
import Region_comp from "../components/region_comp";
import Ajout_region from "../components/ajout_region";
import Suppression from "../components/suppression";
import { getAllRegions } from "../service/region";
import React, { useState, useEffect } from "react";

function Region() {
  const [showReg, setShowReg] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showAjoutReg, setShowAjout_reg] = useState(false);
  const [showSupCrud, setShowSupCrud] = useState(false);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    getAllRegions()
      .then((data) => {
        const mapped = data.map((r) => ({
          id: r.id,
          nomReg: r.nomReg,
          idRegRef: r.regionref?.idRegRef,
          nomRegRef: r.regionref?.nomRegRef,
          latitude: r.regionref?.latitude,
          longitude: r.regionref?.longitude,
        }));
        setRegions(mapped);
        console.log("Regions avec coordonnées :", mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleRegionClick = (region) => {
    console.log("✅ Région cliquée :", region);
    setSelectedRegion(region);
    setShowReg(true);
  };

  useEffect(() => {
    if (selectedRegion) {
      console.log(
        "🧠 useEffect : région sélectionnée = ",
        selectedRegion.nomReg
      );
    }
  }, [selectedRegion]);

  return (
    <div>
      <NavBar />
      <div id="gauche">
        <h2>
          <span>Affichage sur carte</span>
        </h2>
        <div className="madareg">
          <MadagascarMap
            regions={regions}
            selectedRegion={selectedRegion}
            onRegionClick={handleRegionClick}
          />
        </div>
      </div>

      <div id="droite">
        <div className="nouv_reg">
          <h2>
            <span>Régions concernées ({regions.length} régions)</span>
          </h2>
          <button id="ajouter_reg" onClick={() => setShowAjout_reg(true)}>
            <span>Nouvelle région</span>
            <i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="madareg2">
          {regions.map((reg) => (
            <Regionbtn
              key={reg.id}
              region={reg}
              setShowSupCrud={setShowSupCrud}
              setShowReg={() => {
                setSelectedRegion(reg);
                setShowReg(true);
              }}
            />
          ))}
        </div>
      </div>

      {showReg && selectedRegion && (
        <Region_comp
          regionId={selectedRegion?.id}
          region={selectedRegion}
          setShowReg={setShowReg}
        />
      )}

      {showAjoutReg && <Ajout_region setShowAjout_reg={setShowAjout_reg} />}
      {showSupCrud && (
        <Suppression
          titre_sup="region"
          texte=" Y compris tous les éléments qui sont concernés."
          setShowSupCrud={setShowSupCrud}
        />
      )}
    </div>
  );
}

export default Region;
