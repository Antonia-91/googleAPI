import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

///// import data
import { CathegoryByMounth } from "../Data";

function MultiLineChart({ chartData }) {
  ///// WebsiteTrafic data
  const [efterfråganPerMånad, SetEfterfråganPerMånad] = useState({
    labels: CathegoryByMounth.map((data) => data.sökord),
    
    datasets: [
      {
        label: "Efterfrågan per månad: För utvalda kategorier",
        data: CathegoryByMounth.map((data) => data.sökvolym),
        backgroundColor: ["#E7E6E6", "#E7E6E6"],
        borderColor: "black",
        borderWidth: 1,
        fill: true,
      },
    ],
  });

  return (
    <div className="presentation_slider">
      <div className="aside_div">
        <div className="paragaph">
          <p> ______ Marknadsinsiktsanalys</p>
        </div>
        <div className="mainText">
          <h2>
            Efterfrågan per månad:<span> För utvalda kategorier</span>
          </h2>
        </div>
      </div>
      <div className="chart_div">
        <Line data={efterfråganPerMånad} />
      </div>
    </div>
  );
}

export default MultiLineChart;
