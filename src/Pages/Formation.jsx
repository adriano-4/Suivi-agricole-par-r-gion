// import NavBar from "../components/navBar";
// import "../css/formation.css";
// import Formation_date from "../components/formation_date";
// import { useState, useEffect } from "react";
// import Vulgarisation from "../components/vulgarisation";
// import Ajout_formation from "../components/ajout_formation";

// import {
//   getAllFormationsView,
//   getFormationsByRegion,
// } from "../service/formationview";

// function Formation() {
//   const [showInfo, setShowInfo] = useState(false);
//   const [selectedFormation, setSelectedFormation] = useState(null);
//   const [showFormation, setShowFormation] = useState(false);
//   const [showVulg, setShowVulg] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [formations, setFormations] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let region = localStorage.getItem("region");

//         if (region?.startsWith('"') && region.endsWith('"')) {
//           region = region.slice(1, -1);
//         }

//         let data = [];
//         if (region && region.trim() !== "") {
//           data = await getFormationsByRegion(region);
//         } else {
//           data = await getAllFormationsView();
//         }

//         console.log("Données reçues :", data);
//         setFormations(data);
//         setFilteredData(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des formations :", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchFormations = async () => {
//     const data = await getAllFormationsView();
//     setFormations(data);
//   };

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredData(beneficiaires);
//     } else {
//       const lowerSearch = searchTerm.toLowerCase();
//       const filtered = beneficiaires.filter((item) => {
//         const fullName = `${item.nomBenef} ${item.prenomBenef}`.toLowerCase();

//         let dateParts = [];
//         if (item.dateMise) {
//           const d = new Date(item.dateMise);
//           const day = String(d.getDate()).padStart(2, "0");
//           const month = String(d.getMonth() + 1).padStart(2, "0");
//           const year = d.getFullYear();
//           dateParts = [day, month, String(year)];
//         }

//         return (
//           fullName.includes(lowerSearch) ||
//           (item.nomReg && item.nomReg.toLowerCase().includes(lowerSearch)) ||
//           (item.nomDist && item.nomDist.toLowerCase().includes(lowerSearch)) ||
//           (item.nomComm && item.nomComm.toLowerCase().includes(lowerSearch)) ||
//           (item.nomFok && item.nomFok.toLowerCase().includes(lowerSearch)) ||
//           (item.nomAppartenance &&
//             item.nomAppartenance.toLowerCase().includes(lowerSearch)) ||
//           dateParts.some((part) => part.includes(lowerSearch))
//         );
//       });
//       setFilteredData(filtered);
//     }
//   }, [searchTerm, beneficiaires]);

//   return (
//     <div>
//       <NavBar />
//       <div id="recherche">
//         <div className="gauche">
//           <h2>Liste des formations</h2>
//         </div>
//         <div className="option">
//           <input
//             type="text"
//             placeholder="Recherche formations ..."
//             id="recherche_benef"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{
//               boxShadow:
//                 searchTerm && filteredData.length === 0
//                   ? "0 0 7px red"
//                   : "none",
//               border: "none",
//             }}
//           />
//           <button onClick={() => setShowAjout_form(true)}>
//             <span>Nouvelle formation</span>
//             <i className="fa fa-plus"></i>
//           </button>
//         </div>
//       </div>
//       <div id="tableau">
//         <table>
//           <thead>
//             <tr>
//               <th>Région</th>
//               <th>District</th>
//               <th>Commune</th>
//               <th>Fokontany</th>
//               <th>lieu de formation</th>
//               <th>Superviseur responsable</th>
//               <th>Technicien vulgarisateur</th>
//               <th>Date de formation</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.nomReg}</td>
//                   <td>{item.nomDist}</td>
//                   <td>{item.nomComm}</td>
//                   <td>{item.nomFok}</td>
//                   <td>{item.nomAppartenance}</td>
//                   <td></td>
//                   <td>{new Date(item.dateMise).toLocaleDateString()}</td>
//                   <td id="btn_td">
//                     <button
//                       id="Vulgarisation"
//                       onClick={() => {
//                         setSelectedFormation(item);
//                         setShowVulg(true);
//                       }}
//                     >
//                       <span>vulgarisation</span> <i className="fa fa-info"></i>
//                     </button>
//                     <button
//                       id="Apport"
//                       onClick={() => {
//                         setSelectedFormation(item.idBenef);
//                         setShowFormation(true);
//                       }}
//                     >
//                       <span>Date actions</span> <i className="fa fa-info"></i>
//                     </button>
//                     <button id="sup">
//                       <i className="fa fa-trash-alt"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   Aucun résultat trouvé
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {showVulg && selectedFormation && (
//         <Vulgarisation
//           setShowVulg={setShowVulg}
//           formation={selectedFormation}
//         />
//       )}
//       {showFormation && selectedFormation && (
//         <Formation_date
//           setShowFormation={setShowFormation}
//           formation={selectedFormation}
//         />
//       )}

//       {setShowAjout_form && (
//         <Ajout_formation
//           setShowAjout_form={setShowAjout_form}
//           refreshFormations={refreshFormations}
//         />
//       )}
//     </div>
//   );
// }

// export default Formation;
import NavBar from "../components/navBar";
import "../css/formation.css";
import Formation_date from "../components/formation_date";
import { useState, useEffect } from "react";
import Vulgarisation from "../components/vulgarisation";
import Ajout_formation from "../components/ajout_formation";
import Partager from "../components/partager";
import Reporter from "../components/reporter";

import {
  getAllFormationsView,
  getFormationsByRegion,
} from "../service/formationview";

function Formation() {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [showFormation, setShowFormation] = useState(false);
  const [showVulg, setShowVulg] = useState(false);
  const [showAjoutForm, setShowAjoutForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [formations, setFormations] = useState([]);
  const [showPartager, setShowPartager] = useState(false);
  const [showReporter, setShowReporter] = useState(false);

  const refreshFormations = async () => {
    try {
      const data = await getAllFormationsView();
      setFormations(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement :", error);
    }
  };

  const refreshData = () => {
    // setRefreshKey((prev) => prev + 1);
    refreshFormations();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let region = localStorage.getItem("region");

        if (region?.startsWith('"') && region.endsWith('"')) {
          region = region.slice(1, -1);
        }

        let data = [];
        if (region && region.trim() !== "") {
          data = await getFormationsByRegion(region);
        } else {
          data = await getAllFormationsView();
        }

        console.log("Données reçues :", data);
        setFormations(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des formations :", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(formations);
    } else {
      const lowerSearch = searchTerm.toLowerCase();

      const filtered = formations.filter((item) => {
        const fieldsToSearch = [
          item.nomReg,
          item.nomDist,
          item.nomComm,
          item.nomFok,
          item.nomAppartenance,
          item.nomSup,
          item.prenomSup,
          item.nomTech,
          item.prenomTech,
        ];

        let formattedDate = "";
        if (item.dateFormation) {
          const date = new Date(item.dateFormation);
          formattedDate = date.toLocaleDateString("fr-FR"); // ex: 13/10/2025
        }

        return (
          fieldsToSearch.some(
            (field) => field && field.toLowerCase().includes(lowerSearch)
          ) || formattedDate.includes(lowerSearch)
        );
      });

      setFilteredData(filtered);
    }
  }, [searchTerm, formations]);

  console.log(
    "Dates de formation :",
    filteredData.map((f) => f.dateFormation)
  );

  return (
    <div>
      <NavBar />
      <div id="recherche">
        <div className="gauche">
          <h2>Formations</h2>
        </div>
        <div className="option">
          <input
            type="text"
            placeholder="Recherche formation ..."
            id="recherche_benef"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              boxShadow:
                searchTerm && filteredData.length === 0
                  ? "0 0 7px red"
                  : "none",
              border: "none",
            }}
          />
          <button onClick={() => setShowAjoutForm(true)}>
            <span>Nouvelle formation</span>
            <i className="fa fa-plus"></i>
          </button>
          <button
            id="part"
            onClick={() => {
              setShowPartager(true);
            }}
          >
            <i className="fa fa-share-from-square"></i>
          </button>
        </div>
      </div>

      <div id="tableau">
        <table>
          <thead>
            <tr>
              <th>Région</th>
              <th>District</th>
              <th>Commune</th>
              <th>Fokontany</th>
              <th>Lieu de formation</th>
              <th>Superviseur responsable</th>
              <th>Technicien vulgarisateur</th>
              <th>Date de formation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.nomReg}</td>
                  <td>{item.nomDist}</td>
                  <td>{item.nomComm}</td>
                  <td>{item.nomFok}</td>
                  <td>{item.nomAppartenance}</td>
                  <td>
                    {item.nomSup} {item.prenomSup}
                  </td>
                  <td>
                    {item.nomTech} {item.prenomTech}
                  </td>
                  {/* <td>{item.dateFormation.split("T")[0]}</td> */}
                  <td>
                    {item.dateFormation
                      ? new Date(item.dateFormation).toLocaleDateString("fr-FR")
                      : "-"}
                  </td>

                  <td id="btn_td" className="btn_td">
                    <button
                      id="Apport"
                      onClick={() => {
                        setSelectedFormation(item);
                        setShowVulg(true);
                      }}
                    >
                      <span>Vulgarisation</span>
                    </button>
                    <button
                      id="Apport"
                      onClick={() => {
                        setSelectedFormation(item);
                        setShowFormation(true);
                      }}
                    >
                      <span>Date actions</span>
                    </button>
                    <button
                      id="sup"
                      onClick={() => {
                        setSelectedFormation(item);
                        setShowReporter(true);
                      }}
                    >
                      <i className="fa fa-calendar"></i>
                    </button>
                    {/* <button id="valider_">
                      <i className="fa fa-check"></i>
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  Aucun résultat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showVulg && selectedFormation && (
        <Vulgarisation
          setShowVulg={setShowVulg}
          formation={selectedFormation}
          onUpdateSuccess={refreshData}
        />
      )}

      {showFormation && selectedFormation && (
        <Formation_date
          setShowFormation={setShowFormation}
          formation={selectedFormation}
        />
      )}

      {showAjoutForm && (
        <Ajout_formation
          setShowAjout_form={setShowAjoutForm}
          refreshFormations={refreshFormations}
        />
      )}

      {showPartager && (
        <Partager formation={filteredData} setShowPartager={setShowPartager} />
      )}
      {showReporter && (
        <Reporter
          setShowReporter={setShowReporter}
          formation={selectedFormation}
          refreshFormations={refreshFormations}
        />
      )}
    </div>
  );
}

export default Formation;
