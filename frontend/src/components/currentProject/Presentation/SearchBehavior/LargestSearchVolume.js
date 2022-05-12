import React from "react";
// FaTabletAlt

///// import data
import { Cahterogy, CathegoryTags } from "../Data";

const LargestSearchVolume = () => {
  // console.log(Cahterogy);

  /// find largest
  let AllProcents = CathegoryTags?.map((cat) => cat.procent);
  let largest = Math.max(...AllProcents);
  let largestSearchTherm = CathegoryTags.filter(
    (obj) => obj.procent === largest
  );

  /// PROCENT ///
  /// put tags in array
  let tags = largestSearchTherm[0].tags;
  /// calculate total
  let sum = 0;
  let hits = tags.map((tag) => tag.hits);
  hits.forEach((hit) => (sum += hit));
  /// calculate procent
  let divided = hits.map((hit) => hit / sum);
  let procents = divided.map((item) => {
    return Number(item * 100).toFixed(0);
  });

  /// procent
  console.log(procents);

  return (
    <div className="presentation_slider" style={{ backgroundColor: "#E7E6E6" }}>
      <div className="aside_div" style={{ backgroundColor: "#22626E" }}>
        <div className="paragaph">
          <p> ______ Sökbeteende</p>
        </div>

        <div className="mainText">
          <h2>
            {" "}
            Kategorin med störst sökvolym :{" "}
            <span>{largestSearchTherm[0].kategori}</span>
          </h2>
        </div>
      </div>
      <div className="flex_box">
        <div className="flex_box_textHolder">
          <p>
            <span>{largestSearchTherm[0].kategori}</span>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries,
          </p>
    
        </div>
        
        <div className="column_box">
          {procents.map((item) => {
            return <div className="column_box_procent"><p>{item} %</p></div>;
          })}
        </div>

        <div className="column_box">
          {largestSearchTherm[0].tags.map((tag) => {
            return <div className="column_box_tag"><p>{tag.tag}</p></div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default LargestSearchVolume;
