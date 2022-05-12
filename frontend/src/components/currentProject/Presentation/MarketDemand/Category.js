import React from "react";
import { useState, useEffect } from "react";
//FaMobileAlt

///// import data
import { Cahterogy } from "../Data";

const Category = () => {
  let colors = [
    "#821F34",
    "#FBE9E5",
    "#22626E",
    "#E7E6E6",
    "#A5C2F4",
    "#D5A5BD",
    "#B5D7A7",
    "#03695B",
    "#DE6666",
    "#3B78D8",
    "#F6B16A",
    "#FAEFB4",
    "#383760",

  ];

  /// separate the data into several minor arrays of 4 in each
  let result = [];
  let perChunk = 4; // items per chunk

  result = Cahterogy.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
  // console.log(result.map((res) => res));
  let tags = result[0].map((array) => array.tags);
  let position = tags.length;

  let newColor = colors[position % colors.length];
  console.log(newColor);

  // const divStyle = {
  //   backgroundColor : newColor
  // }

  const divStyle = (i) => {
    let color = colors[i % colors.length];
    return color;
  };

  return (
    <>
      {result.map((res) => {
        return (
          <div className="presentation_slider">
            <div className="slider">
              <div className="slider_header">
                <h2>Kategorier</h2>
              </div>

              <div className="slider_data_enhet">
                {res.map((array, i) => {
                  return (
                    <div className="mini_box">
                      <div
                        className="circle_catecory"
                        style={{ backgroundColor: divStyle(i) }}
                      >
                        {array.procent}%
                      </div>
                      <h4>{array.kategori}</h4>
                      <ul>
                        {array.tags.map((tag, i) => {
                          return <li key={i} >{tag}</li>;
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );

  // return (
  //   <div className="presentation_slider">
  //     <div className="slider">
  //       <div className="slider_header">
  //         <h2>Kategorier</h2>
  //       </div>
  //       <div className="slider_data_enhet">
  //         {result[0].map((array) => {
  //           return (
  //             <div className="mini_box">
  //               <div className="circle_catecory">{array.procent}% </div>
  //               <h4>{array.kategori}</h4>
  //               <ul>
  //                 {array.tags.map((tag) => {
  //                   return <li>{tag}</li>;
  //                 })}
  //               </ul>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Category;
