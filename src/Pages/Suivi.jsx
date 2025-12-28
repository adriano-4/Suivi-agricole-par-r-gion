import NavBar from "../components/navBar";
import "../css/suivi.css";
import React, { useState, useEffect } from "react";
import Donnee from "../components/donnee";
import { getAllRegions } from "../service/region";
import Graphe from "../components/graphe";
import { getAllStats } from "../service/stat";
import html2canvas from "html2canvas";
import Chargement from "../components/chargement";
import { getAllSuperficieRegion } from "../service/superficieRegion";
import { Bar } from "react-chartjs-2";
import { getObjectifs, updateObjectifQuantite } from "../service/objectif";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Genererrapport from "../components/genererrapport";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import Plusstat from "../components/plusstat";

function Suivi() {
  const [regions, setRegions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const anneePrecedente = new Date().getFullYear() - 1;
  const [stats, setStats] = useState([]);
  const [sup, setSup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGen, setShowGen] = useState(false);
  const [showPlusStat, setShowPlusStat] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedStats, setSelecterStats] = useState(null);
  const [objectifs, setObjectifs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [tempQuantite, setTempQuantite] = useState("");
  const [searchObj, setSearchObj] = useState("");

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

  const fetchObjectifs = async () => {
    try {
      const data = await getObjectifs();
      setObjectifs(data);
    } catch (error) {
      console.error("Erreur lors du chargement des objectifs :", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchObjectifs();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % affichages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + affichages.length) % affichages.length
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const regionData = await getAllRegions();
        const statsData = await getAllStats();
        const SupData = await getAllSuperficieRegion();

        const coloredRegions = regionData.map((region) => ({
          ...region,
          color: getRandomColor(),
        }));

        setRegions(coloredRegions);
        setStats(statsData);
        setSup(SupData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nbrFormationsParRegion = regions.map(
    (region) =>
      stats.find((s) => s.region === region.nomReg)?.nbr_formation || 0
  );

  const nbrBeneficiairesParRegion = regions.map(
    (region) =>
      stats.find((s) => s.region === region.nomReg)?.nbr_beneficiaire || 0
  );

  const getRegionColor = (regionName) => {
    const region = regions.find(
      (r) => r.region === regionName || r.nomReg === regionName
    );
    return region ? region.color : "rgb(100,100,100)";
  };

  console.log(nbrFormationsParRegion);
  console.log(nbrBeneficiairesParRegion);
  const data = {
    labels: stats.map((s) => s.region),
    datasets: [
      {
        label: "Rendement moyen (t/ha)",
        data: stats.map((s) => s.rendement_precedente_moyen),
        backgroundColor: "rgba(123, 156, 255, 0.6)",
        borderColor: "rgba(127, 123, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: stats.map((s) => s.region),
    datasets: [
      {
        label: "Rendement total (t/ha)",
        data: stats.map((s) => s.rendement_precedente_total),
        backgroundColor: "rgba(136, 255, 123, 0.6)",
        borderColor: "rgba(123, 255, 134, 1)",
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: sup.map((s) => s.region),
    datasets: [
      {
        label: "Superficie totale cible (ha)",
        data: sup.map((s) => s.superficieTotaleCible),
        backgroundColor: "rgba(255, 152, 123, 0.6)",
        borderColor: "rgba(255, 141, 123, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: { position: "top" },
      title: {
        display: false,
        text: "Rendement moyen",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleDownload = async () => {
    const aff1 = document.querySelector(".aff1");
    if (!aff1) {
      alert("Aucune section à capturer !");
      return;
    }

    const canvas = await html2canvas(aff1, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = `statistiques_region_${anneePrecedente}.png`;
    link.click();
  };

  const handlePlusStat = (region, stats) => {
    setSelectedRegion(region);
    setSelecterStats(stats);
    setShowPlusStat(true);
  };

  const handleValidate = async (idObj, newQuantite) => {
    try {
      await updateObjectifQuantite(idObj, newQuantite);

      setObjectifs((prev) =>
        prev.map((obj) =>
          obj.idObj === idObj ? { ...obj, quantiteObj: newQuantite } : obj
        )
      );
      fetchObjectifs();

      setEditingId(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'objectif :", error);
      alert("Erreur lors de la mise à jour de l'objectif.");
    }
  };

  const affichages = [
    <div key="a3" className="aff1">
      <h3 id="aff1titre">SUPERFICIE CIBLE (FORMATION)</h3>
      <div id="graphe2">
        <Bar id="bargraphe" data={data3} options={options} />
      </div>{" "}
    </div>,
    <div key="a1" className="aff1">
      <h3 id="aff1titre">RENDEMENT MOYEN PAR REGION ({anneePrecedente})</h3>
      <div id="graphe2">
        <Bar id="bargraphe" data={data} options={options} />
      </div>
    </div>,
    <div key="a2" className="aff1">
      <h3 id="aff1titre">RENDEMENT TOTAL PAR REGION ({anneePrecedente})</h3>
      <div id="graphe2">
        <Bar id="bargraphe" data={data2} options={options} />
      </div>{" "}
    </div>,
  ];

  return (
    <div>
      <NavBar />
      {loading ? (
        <Chargement />
      ) : (
        <div id="ppale_suivi">
          <div className="gauche_suivi">
            <h2>Statistique par région</h2>
            <div className="donnee__">
              {regions.length > 0 ? (
                regions.map((region, index) => (
                  <Donnee
                    key={index}
                    region={region}
                    onPlusStatClick={handlePlusStat}
                  />
                ))
              ) : (
                <p>Aucune région trouvée.</p>
              )}
            </div>
          </div>
          <div className="droite_suivi">
            <div className="gggg">
              <h2>Graphique</h2>
              <button
                id="generer_rapport"
                onClick={() => {
                  setShowGen(true);
                }}
              >
                <span>Générer un rapport</span>✨
              </button>
              <button id="down" onClick={handleDownload}>
                <i className="fa fa-file-arrow-down"></i>
              </button>
              <div className="btn_next">
                <button onClick={handlePrev}>
                  <i className="fa fa-caret-left"></i>
                </button>
                <button onClick={handleNext}>
                  <i className="fa fa-caret-right"></i>
                </button>
              </div>
            </div>
            <div className="partie_haut_graphique">
              {affichages[currentIndex]}
            </div>
            <div className="partie_bas_graphique">
              {/* <Graphe
                regions={regions}
                titre="Nombre de formations"
                donnee={nbrFormationsParRegion}
                nom="Formations"
              />
              <Graphe
                regions={regions}
                titre="Nombre de Bénéficiaires"
                donnee={nbrBeneficiairesParRegion}
                nom="Bénéficiaires"
              />
              <Graphe
                regions={regions}
                titre="Nombre de Livraisons"
                // donnee={nbrBeneficiairesParRegion}
                nom="Livraisons"
              /> */}
              <div className="bas_graphique_obj">
                <div className="div_titre">
                  <h1 id="titre_obj">Objectifs</h1>{" "}
                  <input
                    id="rech_obj"
                    type="text"
                    placeholder="Recherche dans les objectifs ..."
                    value={searchObj}
                    onChange={(e) => setSearchObj(e.target.value)}
                  />
                </div>
                <div className="obj_div">
                  {/* {objectifs.map((obj) => (
                    <div key={obj.idObj} className="obj_div1">
                      <div className="obj_divh">
                        <p>{obj.libelle}</p>
                        {editingId !== obj.idObj && (
                          <section>
                            <span>
                              {obj.quantiteObj}
                              &nbsp;
                              {obj.unite}
                            </span>
                            <i
                              className="fa fa-pen-to-square"
                              onClick={() => setEditingId(obj.idObj)}
                            ></i>
                          </section>
                        )}
                      </div>

                      {editingId === obj.idObj && <div id="ligneobj"></div>}
                      {editingId === obj.idObj && (
                        <div className="obj_divb">
                          <input
                            type="text"
                            placeholder="Objectif..."
                            defaultValue={obj.quantiteObj}
                            onChange={(e) => setTempQuantite(e.target.value)}
                          />
                          <div>
                            <i
                              className="fa-regular fa-circle-check"
                              onClick={() =>
                                handleValidate(obj.idObj, tempQuantite)
                              }
                            ></i>
                            <i
                              className="fa fa-xmark"
                              onClick={() => setEditingId(null)}
                            ></i>
                          </div>
                        </div>
                      )}
                    </div>
                  ))} */}
                  {objectifs
                    .filter((obj) => {
                      const search = searchObj.toLowerCase();
                      return (
                        obj.libelle.toLowerCase().includes(search) ||
                        obj.unite.toLowerCase().includes(search) ||
                        obj.quantiteObj.toString().includes(search)
                      );
                    })
                    .map((obj) => (
                      <div key={obj.idObj} className="obj_div1">
                        <div className="obj_divh">
                          <p>{obj.libelle}</p>
                          {editingId !== obj.idObj && (
                            <section>
                              <span>
                                {obj.quantiteObj} &nbsp; {obj.unite}
                              </span>
                              <i
                                className="fa fa-pen-to-square"
                                onClick={() => setEditingId(obj.idObj)}
                              ></i>
                            </section>
                          )}
                        </div>

                        {editingId === obj.idObj && <div id="ligneobj"></div>}
                        {editingId === obj.idObj && (
                          <div className="obj_divb">
                            <input
                              type="text"
                              placeholder="Objectif..."
                              defaultValue={obj.quantiteObj}
                              onChange={(e) => setTempQuantite(e.target.value)}
                            />
                            <div>
                              <i
                                className="fa-regular fa-circle-check"
                                onClick={() =>
                                  handleValidate(obj.idObj, tempQuantite)
                                }
                              ></i>
                              <i
                                className="fa fa-xmark"
                                onClick={() => setEditingId(null)}
                              ></i>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showGen && <Genererrapport regions={regions} setShowGen={setShowGen} />}
      {showPlusStat && selectedRegion && (
        <Plusstat
          region={selectedRegion}
          stats={selectedStats}
          onClose={() => setShowPlusStat(false)}
        />
      )}
    </div>
  );
}

export default Suivi;
