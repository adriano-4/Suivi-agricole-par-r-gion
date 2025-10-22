import { useState, useEffect } from "react";
import "../css/suivi.css";
import { getStatByRegion } from "../service/stat";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// function Graphe({ regions, titre, donnee }) {
//   const options = {
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   if (!regions || regions.length === 0) return <p>Chargement...</p>;

//   const toRGBA = (rgb, alpha = 0.5) => {
//     const values = rgb.match(/\d+/g);
//     if (!values) return rgb;
//     return `rgba(${values[0]},${values[1]},${values[2]},${alpha})`;
//   };

//   const pieData = {
//     labels: regions.map((r) => r.nomReg),
//     datasets: [
//       {
//         label: "Régions",
//         data: donnee,
//         backgroundColor: regions.map((r) => toRGBA(r.color, 0.3)),
//         borderColor: regions.map((r) => r.color),
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div id="graphe">
//       <div className="gauche_graphe">
//         <h3 id="aff1titre2">{titre}</h3>
//       </div>
//       <div className="bas_graphe">
//         <Pie id="pie" data={pieData} options={options} />
//       </div>
//     </div>
//   );
// }

function Graphe({ regions, titre, donnee, nom }) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // 🔹 Sécurité : si données manquantes, on ne bloque pas le rendu
  const labels = regions?.map((r) => r.nomReg) || [];
  const dataValues = donnee?.length ? donnee : Array(labels.length).fill(0);

  const toRGBA = (rgb, alpha = 0.5) => {
    const values = rgb?.match(/\d+/g);
    if (!values) return rgb;
    return `rgba(${values[0]},${values[1]},${values[2]},${alpha})`;
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: nom,
        data: dataValues,
        backgroundColor: regions?.map((r) => toRGBA(r.color, 0.3)) || [],
        borderColor: regions?.map((r) => r.color) || [],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div id="graphe">
      <div className="gauche_graphe">
        <h3 id="aff1titre2">{titre}</h3>
      </div>
      <div className="bas_graphe">
        <Pie id="pie" data={pieData} options={options} />
      </div>
    </div>
  );
}

export default Graphe;
