import { useState, useEffect } from "react";
import "../css/suivi.css";
import { getStatByRegion } from "../service/stat";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function graphe({ regions }) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (!regions || regions.length === 0) return <p>Chargement...</p>;

  const toRGBA = (rgb, alpha = 0.5) => {
    const values = rgb.match(/\d+/g);
    if (!values) return rgb;
    return `rgba(${values[0]},${values[1]},${values[2]},${alpha})`;
  };

  const pieData = {
    labels: regions.map((r) => r.nomReg),
    datasets: [
      {
        label: "Régions",
        data: regions.map(() => 1),
        backgroundColor: regions.map((r) => toRGBA(r.color, 0.3)),
        borderColor: regions.map((r) => r.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div id="graphe">
      <div className="gauche_graphe"></div>
      <div className="bas_graphe">
        <Pie id="pie" data={pieData} options={options} />
      </div>
    </div>
  );
}

export default graphe;
