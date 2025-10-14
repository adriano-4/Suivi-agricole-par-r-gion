// import NavBar from "../components/navBar";
// import "../css/beneficiaire.css";
// import NavItem from "../components/NavItem";
// import Info_perso from "../components/info_perso";
// import { useState, useEffect } from "react";
// import Apport from "../components/apport";
// import Ajout_ben from "../components/ajout_ben";

// function Beneficiaire() {
//   const [showInfo, setShowInfo] = useState(false);
//   const [showApport, setShowApport] = useState(false);
//   const [showAjout_ben, setShowAjout_ben] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   // Données simulées
//   const data = [
//     {
//       nom: "RANDRIANAMBININA Toky Adriano",
//       region: "FITOVINANY",
//       district: "Vohipeno",
//       commune: "Sakavola",
//       fokontany: "Ilakatra",
//       adresse: "Tambohosola",
//       perimetre: "Sakavola",
//       aue: "Miaramandroso",
//       livraison: "12/12/12",
//     },
//     // Tu peux ajouter d'autres bénéficiaires ici
//   ];

//   // Filtrage automatique à chaque changement de searchTerm
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredData(data);
//     } else {
//       const filtered = data.filter((item) =>
//         Object.values(item).some((val) =>
//           val.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredData(filtered);
//     }
//   }, [searchTerm]);

//   return (
//     <div>
//       <NavBar />
//       <div id="recherche">
//         <div className="gauche">
//           <h2>Liste des bénéficiaires</h2>
//         </div>
//         <div className="option">
//           <input
//             type="text"
//             placeholder="Recherche bénéficiaire ..."
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
//           <button onClick={() => setShowAjout_ben(true)}>
//             <span>Nouveau bénéficiaire</span>
//             <i className="fa fa-plus"></i>
//           </button>
//         </div>
//       </div>
//       <div id="tableau">
//         <table>
//           <thead>
//             <tr>
//               <th>Nom du bénéficiaire</th>
//               <th>Region</th>
//               <th>District</th>
//               <th>Commune</th>
//               <th>Fokontany</th>
//               <th>Adresse</th>
//               <th>Périmètre d'appartenance</th>
//               <th>Nom AUE d'appartenance</th>
//               <th>Livraison intrant</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.nom}</td>
//                   <td>{item.region}</td>
//                   <td>{item.district}</td>
//                   <td>{item.commune}</td>
//                   <td>{item.fokontany}</td>
//                   <td>{item.adresse}</td>
//                   <td>{item.perimetre}</td>
//                   <td>{item.aue}</td>
//                   <td>{item.livraison}</td>
//                   <td id="btn_td">
//                     <button id="info" onClick={() => setShowInfo(true)}>
//                       <span>Info perso</span> <i className="fa fa-info"></i>
//                     </button>
//                     <button id="Apport" onClick={() => setShowApport(true)}>
//                       <span>Apport</span> <i className="fa fa-info"></i>
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
//       {showInfo && <Info_perso setShowInfo={setShowInfo} />}
//       {showApport && <Apport setShowApport={setShowApport} />}
//       {showAjout_ben && <Ajout_ben setShowAjout_ben={setShowAjout_ben} />}
//     </div>
//   );
// }

// export default Beneficiaire;
import NavBar from "../components/navBar";
import "../css/beneficiaire.css";
import Info_perso from "../components/info_perso";
import { useState, useEffect } from "react";
import Apport from "../components/apport";
import Ajout_ben from "../components/ajout_ben";
import {
  getAllBeneficiairesView,
  getBeneficiairesParRegion,
} from "../service/beneficiaireview";

function Beneficiaire() {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedBenef, setSelectedBenef] = useState(null);
  const [showApport, setShowApport] = useState(false);
  const [showAjout_ben, setShowAjout_ben] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [beneficiaires, setBeneficiaires] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getAllBeneficiairesView();
  //       setBeneficiaires(data);
  //       setFilteredData(data);
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de la récupération des bénéficiaires :",
  //         error
  //       );
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let region = localStorage.getItem("region");

        if (region?.startsWith('"') && region.endsWith('"')) {
          region = region.slice(1, -1);
        }

        let data = [];
        if (region && region.trim() !== "") {
          data = await getBeneficiairesParRegion(region);
        } else {
          data = await getAllBeneficiairesView();
        }

        console.log("Données reçues :", data);
        setBeneficiaires(data);
        setFilteredData(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des bénéficiaires :",
          error
        );
      }
    };

    fetchData();
  }, []);

  const fetchBeneficiaires = async () => {
    const data = await getAllBeneficiairesView();
    setBeneficiaires(data);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(beneficiaires);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = beneficiaires.filter((item) => {
        const fullName = `${item.nomBenef} ${item.prenomBenef}`.toLowerCase();

        let dateParts = [];
        if (item.dateMise) {
          const d = new Date(item.dateMise);
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = d.getFullYear();
          dateParts = [day, month, String(year)];
        }

        return (
          fullName.includes(lowerSearch) ||
          (item.nomReg && item.nomReg.toLowerCase().includes(lowerSearch)) ||
          (item.nomDist && item.nomDist.toLowerCase().includes(lowerSearch)) ||
          (item.nomComm && item.nomComm.toLowerCase().includes(lowerSearch)) ||
          (item.nomFok && item.nomFok.toLowerCase().includes(lowerSearch)) ||
          (item.nomAppartenance &&
            item.nomAppartenance.toLowerCase().includes(lowerSearch)) ||
          dateParts.some((part) => part.includes(lowerSearch))
        );
      });
      setFilteredData(filtered);
    }
  }, [searchTerm, beneficiaires]);

  return (
    <div>
      <NavBar />
      <div id="recherche">
        <div className="gauche">
          <h2>Liste des bénéficiaires</h2>
        </div>
        <div className="option">
          <input
            type="text"
            placeholder="Recherche bénéficiaire ..."
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
          <button onClick={() => setShowAjout_ben(true)}>
            <span>Nouveau bénéficiaire</span>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <div id="tableau">
        <table>
          <thead>
            <tr>
              <th>Nom du bénéficiaire</th>
              <th>Region</th>
              <th>District</th>
              <th>Commune</th>
              <th>Fokontany</th>
              <th>Périmètre d'appartenance</th>
              <th>Livraison intrant</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.nomBenef} {item.prenomBenef}
                  </td>
                  <td>{item.nomReg}</td>
                  <td>{item.nomDist}</td>
                  <td>{item.nomComm}</td>
                  <td>{item.nomFok}</td>
                  <td>{item.nomAppartenance}</td>
                  <td>{new Date(item.dateMise).toLocaleDateString()}</td>
                  <td id="btn_td">
                    <button
                      id="info"
                      onClick={() => {
                        setSelectedBenef(item); // <-- on sauvegarde le bénéficiaire sélectionné
                        setShowInfo(true);
                      }}
                    >
                      <span>Info perso</span> <i className="fa fa-info"></i>
                    </button>
                    <button
                      id="Apport"
                      onClick={() => {
                        setSelectedBenef(item.idBenef);
                        setShowApport(true);
                      }}
                    >
                      <span>Apport</span> <i className="fa fa-info"></i>
                    </button>
                    <button id="sup">
                      <i className="fa fa-trash-alt"></i>
                    </button>
                    <button
                      id="part"
                      onClick={() => {
                        // setSelectedFormation(item);
                        // setShowPartager(true);
                      }}
                    >
                      <i className="fa fa-paperclip"></i>
                    </button>
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

      {showInfo && selectedBenef && (
        <Info_perso setShowInfo={setShowInfo} beneficiaire={selectedBenef} />
      )}
      {showApport && selectedBenef && (
        <Apport setShowApport={setShowApport} idBenef={selectedBenef} />
      )}

      {showAjout_ben && (
        <Ajout_ben
          setShowAjout_ben={setShowAjout_ben}
          refreshBeneficiaires={fetchBeneficiaires}
        />
      )}
    </div>
  );
}

export default Beneficiaire;
