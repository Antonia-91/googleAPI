import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

///// import data
import { CathegoryByMounth, CathegoryTags } from "../Data";
console.log(CathegoryTags.map((array) => array.tags));

/// find largest
let AllProcents = CathegoryTags?.map((cat) => cat.procent);
let largest = Math.max(...AllProcents);
let largestSearchTherm = CathegoryTags.filter((obj) => obj.procent === largest);
let tags = largestSearchTherm[0].tags;
console.log(tags);

const Largest_Dougnut = () => {
  const [cathegoryTags, setCathegoryTags] = useState({
    labels: tags.map((data) => data.tag),
    datasets: [
      {
        label: "Sökbeteende",
        data: tags.map((data) => data.hits),
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
    <div className="presentation_slider" style={{ backgroundColor: "#E7E6E6" }}>
      <div className="aside_div" style={{ backgroundColor: "#22626E" }}>
        <div className="paragaph">
          <p> ______ Sökbeteende</p>
        </div>

        <div className="mainText">
          <h2>
            {largestSearchTherm[0].kategori}:<span> tags</span>
          </h2>
          <ul>
            {tags.map((tag) => {
              return (
                <li>
                  {tag.tag} : {tag.hits} st
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="chart_div">
        <Doughnut data={cathegoryTags} />
      </div>
    </div>
  );
};

export default Largest_Dougnut;
