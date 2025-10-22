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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Suivi() {
  const [regions, setRegions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const anneePrecedente = new Date().getFullYear() - 1;
  const [stats, setStats] = useState([]);
  const [sup, setSup] = useState([]);

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
        data: sup.map((s) => s.superficieTotaleCible), // ← ici on prend la superficie
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

    // const pdf = new jsPDF("l", "pt", "a4");
    // const imgProps = pdf.getImageProperties(imgData);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    // pdf.save(`statistiques_region_${anneePrecedente}.pdf`);
  };

  const affichages = [
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
    <div key="a3" className="aff1">
      <h3 id="aff1titre">SUPERFICIE CIBLE (FORMATION)</h3>
      <div id="graphe2">
        <Bar id="bargraphe" data={data3} options={options} />
      </div>{" "}
    </div>,
  ];

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
          <div className="gggg">
            <h2>Graphique</h2>
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
            <Graphe
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
            />
          </div>
        </div>
      </div>
      <Chargement />
    </div>
  );
}

export default Suivi;
