///////// my code
import React from "react";
import { Line } from "react-chartjs-2";
import { useState } from "react";

///// import data
import { AllThermsByMount } from "../Data";

const LineChart = () => {
  ///// Sökvolym per månad senaste åre
  const [efterfråganPerMånad, SetEfterfråganPerMånad] = useState({
    labels: AllThermsByMount.map((data) => data.månad),
    // backgroundColor: "#DE6666",
    datasets: [
      {
        label: "Sökvolym per månad senaste året",
        data: AllThermsByMount.map((data) => data.sökvolym),
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
            Efterfrågan per månad:<span> Alla sökord</span>
          </h2>
        </div>
      </div>
      <div className="chart_div">
        <Line data={efterfråganPerMånad} />
      </div>
    </div>
  );
};

export default LineChart;
