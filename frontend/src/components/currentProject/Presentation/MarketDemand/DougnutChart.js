import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

///// import data
import { CathegoryByMounth } from "../Data";

const DougnutChart = ({ chartData }) => {
  ///// Efterfrågan per månad: För utvalda kategorier
  const [cathegory, setCathegory] = useState({
    labels: CathegoryByMounth.map((data) => data.sökord),
    datasets: [
      {
        label: "Efterfrågan per månad: För utvalda kategorie",
        data: CathegoryByMounth.map((data) => data.sökvolym),
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
        hoverOffset: 8,
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
            Efterfrågan per månad:<span> För utvalda kategorie</span>
          </h2>
        </div>
        
      </div>
      <div className="chart_div">
        <Doughnut data={cathegory} />
      </div>
    </div>
  );

  //return <Doughnut data={chartData} />;
};

export default DougnutChart;
