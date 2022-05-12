import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

///// import data
import { CathegoryByMounth } from "../Data";

console.log(CathegoryByMounth);

console.log(CathegoryByMounth[1].sökvolym);
console.log(CathegoryByMounth[1].sökord);

console.log(CathegoryByMounth[2].sökvolym);
console.log(CathegoryByMounth[2].sökord);

const MultiLineChart2 = () => {
  ///// WebsiteTrafic data
  const [efterfråganPerMånad, SetEfterfråganPerMånad] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Maj",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: CathegoryByMounth[1].sökord,
        fill: false,
        lineTension: 1,
        backgroundColor: "gray",
        borderColor: "gray",
        borderWidth: 1,
        data: CathegoryByMounth[1].utveckling.map((data) => data),
      },
      {
        label: CathegoryByMounth[2].sökord,
        fill: false,
        lineTension: 1,
        backgroundColor: "#ccccff",
        borderColor: "gray",
        borderWidth: 1,
        data: CathegoryByMounth[2].utveckling.map((data) => data),
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
        <Line
          data={efterfråganPerMånad}
          options={{
            title: {
              display: true,
              text: "Size of Retirement Savings",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
};

export default MultiLineChart2;
