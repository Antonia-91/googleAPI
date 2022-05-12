import { useState } from "react";
///// import chart components
import HeaderTracker from "../../HeaderTracker/HeaderTracker";
import LineChart from "./MarketDemand/LineChart";
import BarChart from "./MarketDemand/BarChart";
import MultiLineChart from "./MarketDemand/MultiLineChart";
import PieChart from "./MarketDemand/PieChart";
import DougnutChart from "./MarketDemand/DougnutChart";
import Unit from "./MarketDemand/Unit";
import Category from "./MarketDemand/Category";
import LargestSearchVolume from "./SearchBehavior/LargestSearchVolume";
import SecondLargest from "./SearchBehavior/SecondLargest";
import Largest_Dougnut from "./SearchBehavior/Largest_Dougnut";
import SecondL_Dougnut from "./SearchBehavior/SecondL_Dougnut";
import MultiLineChart2 from "./MarketDemand/MultiLineChart2";

let colors = [
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
];

const Presentation = ({ currentProject }) => {
  //console.log(currentProject);

  return (
    <div>
      <header>
        <HeaderTracker currentProject={currentProject} />
      </header>
      <div className="presentation_container">
        <h1>Marknadens efterfrågan</h1>
        <ul style={{ fontSize: "12px" }}>
          <li> Den totala marknadens efterfrågan</li>
          <li>Efterfrågan per månad</li>
          <li> Efterfrågan per enhet</li>
          <li>Efterfrågan per kategori</li>
        </ul>

        <LineChart />
        <BarChart colors={colors} />
        <PieChart />
        <MultiLineChart />
        <MultiLineChart2 />
        <DougnutChart />
        <Unit />
        <Category />
        <h1>Sökbeteende</h1>
        <p>Nedan djupdyker vi i marknadsanalysens olika sökordskategorier.</p>
        <LargestSearchVolume />
        <Largest_Dougnut />
        <SecondLargest />
        <SecondL_Dougnut />
      </div>
    </div>
  );
};

export default Presentation;
