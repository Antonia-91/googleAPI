import React from "react";
import { useState } from "react";

///// import data
import { UnitData } from "../Data";


const Unit = () => {
  return (
    <div className="presentation_slider">
      <div className="slider">
        ´
        <div className="slider_header">
          <h2>Efterfrågan per enhet</h2>
        </div>
        <div className="slider_data_enhet">
          {UnitData.map((enhet) => {
            return (
              <div className="mini_box">
                <div className="circle_unit">X </div>
                <h3>{enhet.enhet}</h3>
                <h4>{enhet.antal}</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Unit;
