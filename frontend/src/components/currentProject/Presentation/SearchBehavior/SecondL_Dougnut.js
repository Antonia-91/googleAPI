import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

///// import data
import { CathegoryByMounth, CathegoryTags } from "../Data";
console.log(CathegoryTags.map((array) => array.tags));

/// find  SECOND largest
function nextBiggest(arr) {
  let max = -Infinity,
    result = -Infinity;

  for (const value of arr) {
    const nr = Number(value);

    if (nr > max) {
      [result, max] = [max, nr]; // save previous max
    } else if (nr < max && nr > result) {
      result = nr; // new second biggest
    }
  }

  return result;
}
/// all procents values in an array
let AllProcents = CathegoryTags?.map((cat) => cat.procent);

/// use function on AllProcent array
let secondBiggest = nextBiggest(AllProcents);
//console.log(secondBiggest);

/// filter out the secondBiggest from orginal objectArray
let secondLargest = CathegoryTags.filter(
  (obj) => obj.procent === secondBiggest
);

/// put tags in array
let tags = secondLargest[0].tags;

const SecondL_Dougnut = () => {
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
            {secondLargest[0].kategori}:<span> tags</span>
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

export default SecondL_Dougnut;
