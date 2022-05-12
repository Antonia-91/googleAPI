import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

///// import data
import { AllThermsByMount } from "../Data";

function PieChart({ chartData }) {
  ///// hitsdata
  const [efterfråganPerMånad, SetEfterfråganPerMånad] = useState({
    labels: AllThermsByMount.map((data) => data.månad),
    datasets: [
      {
        label: "Efterfrågan per månad Alla sökord",
        data: AllThermsByMount.map((data) => data.sökvolym),
        backgroundColor: [
          "#03695B",
          "#DE6666",
          "#3B78D8",
          "#F6B16A",
          "#FAEFB4",
          "#383760",
          "#821F34",
          "#FBE9E5",
          "#22626E",
          "#E7E6E6",
          "#A5C2F4",
          "#D5A5BD",
          "#B5D7A7",
        ],
        borderColor: "black",
        borderWidth: 1,
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
          Efterfrågan per månad:<span> Alla sökord</span>
          </h2>
        </div>
      </div>
      <div className="chart_div">
        <Pie data={efterfråganPerMånad} />
      </div>
    </div>
  );
}

export default PieChart;
