import React from "react";

///// import data
import { Cahterogy, CathegoryTags } from "../Data";

const SecondLargest = () => {
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
  //console.log(secondLargest);

  /// PROCENT
  /// put tags in array
  let tags = secondLargest[0].tags;
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
            Kategorin med näst högst sökvolym :{" "}
            <span>{secondLargest[0].kategori}</span>
          </h2>
        </div>
      </div>
      <div className="flex_box">
        <div className="flex_box_textHolder">
          <p>
            <span>{secondLargest[0].kategori}</span>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries,
          </p>
        </div>
        <div className="column_box">
          {procents.map((item) => {
            return (
              <div className="column_box_procent">
                <p>{item} %</p>
              </div>
            );
          })}
        </div>

        <div className="column_box">
          {secondLargest[0].tags.map((tag) => {
            return (
              <div div className="column_box_tag">
                <p>{tag.tag}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecondLargest;
