///////------------  SUMMARY ------------////////
// post keywords till currentProject
// get all keywords
// ta alla våran keywords, skicka iväg till googleAPI !!
// respons från googleApi , skickas tillbaka till currentProject.js och sparas i våran db
//  OBS; Just nu kan vo bara läggain Searchterms manuellt ! Google API funkar inte just nu !
////////////////////////////////////////////////////

import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import HeaderTracker from "../../HeaderTracker/HeaderTracker";

const Discovery = (props) => {
  //console.log(props.searchTerms);
  //const [keyword, setKeyword] = useState("");
  const [arrayKeywords, setArrayKeywords] = useState();
  const [string, setString] = useState("");
  const [saveText, setSaveText] = useState("");

  let splitString = [];
  let uniqueChars = [];

  const navigate = useNavigate();
  //console.log(props.currentProject);

  useEffect(() => {
    const getProjectKeywords = async () => {
      let idToServer = props.currentProject?.project_id;
      const keyWordsFromServer = await fetchProjectKeywords(idToServer);
      setArrayKeywords(keyWordsFromServer);
    };

    getProjectKeywords();
  }, [props.currentProject]);

  ///// fetch project keywords
  const fetchProjectKeywords = async (id) => {
    const res = await fetch(`http://localhost:5001/projectKeyords/${id}`);
    const data = await res.json();
    // console.log(data);
    return data;
  };

  //// onSubmit form
  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(string);
    // value saved as a string from onchange in textarea,
    // where there is an enter (/n) we want to split the string and save them as items in an array.
    splitString = string.split("\n"); // or (",")
    console.log(splitString);

    // remove duplicate searchterms
    uniqueChars = splitString.filter((c, index) => {
      return splitString.indexOf(c) === index;
    });
    console.log(uniqueChars);

    let arrayToServer = [];
    let newSubArray = [];

    for (let i = 0; i < uniqueChars.length; i++) {
      newSubArray = [uniqueChars[i], props.currentProject.project_id];

      arrayToServer[arrayToServer.length] = newSubArray;
    }
    console.log(arrayToServer);

    // then send the Array to backend
    await onAddKeywords(arrayToServer);
    // empty the texarea
    setString("");
  };

  const onAddKeywords = async (newKeywords) => {
    const res = await fetch(`http://localhost:5001/projectKeyords/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newKeywords),
    });
    const data = await res.json();
    console.log(data);
    if (data.message === "ok") {
      for (let i = 0; i < data.result.affectedRows; i++) {
        let upDateKeywords = {
          keyword_id: data.result.insertId + i,
          keyword_title: uniqueChars[i],
          project_id: props.currentProject.project_id,
        };
        // OBS, bättre att setState endast sker 1 gång .. ?
        setArrayKeywords((prevState) => [...prevState, upDateKeywords]);
      }
    }
  };

  //// onDelete keyword (item)
  const deleteItem = async (id) => {
    console.log("delete item", id);
    alert("delete this keyword?!");

    await fetch(`http://localhost:5001/projectKeyords/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "delete keyword success") {
          let filtered = arrayKeywords.filter(
            (items) => items.keyword_id !== id
          );
          setArrayKeywords(filtered);
        }
      });
  };
  // Generates mock data to be sent to db.
  // const fetchKeywordAPI = () => {
  //   let ApiResponseArray = [];
  //   arrayKeywords.forEach(kw => {
  //     for(let i = 0; i < 10; i++){
  //       ApiResponseArray.push(kw);
  //     }
  //   })
  //   console.log(ApiResponseArray);
  //   props.saveSearchTerms(ApiResponseArray);
  // }

  // on hover a keyword, change text to DELETE
  const changeText = (e) => {
    setSaveText(e.target.innerText);
    e.target.innerText = "DELETE";
  };

  const changeBack = (e) => {
    e.target.innerText = saveText;
  };

  ////////-------- Returning following Elements ---------///////////////
  if (!arrayKeywords) return null;
  return (
    <>
      <header>
        <HeaderTracker currentProject={props.currentProject} />
      </header>
      <section className="discovery_wrapper">
        <span>Keyword planner API </span>

        <div className="discovery_section">
          <span> Every keyword must be seperated by a linebrake </span>
          <div className="add_section">
            <form onSubmit={onsubmit}>
              <textarea
                className="type_keyword_input"
                type="text"
                placeholder="keyword"
                value={string}
                onChange={(e) => setString(e.target.value)}
              />
              <button className="add-btn" type="submit">
                Add{" "}
              </button>
            </form>

            <span>Keywords Edits</span>
            <div className="edit_section">
              {arrayKeywords?.map((obj) => (
                <div className="item_section" key={obj.keyword_id}>
                  <p>{obj.keyword_title}</p>
                  <button
                    onClick={() => deleteItem(obj.keyword_id)}
                    className="delete_btn"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="generate_section">
            <div className="select_section">
              <span>Max result: 800</span>
              <select>
                <option value="0">800:</option>
                <option value="1">600</option>
                <option value="2">400</option>
                <option value="3">200</option>
                <option value="4">100</option>
                <option value="5">50</option>
              </select>
            </div>

            <button
              className="generate"
              //  onClick={fetchKeywordAPI}
            >
              Generate to googleAPI
            </button>
          </div>
        </div>

        <span> Resaults from google API: Searchterms, Hits, Location </span>

        <div className="discovery_section">
          <table>
            <thead>
              <tr>
                <th>Searchterms</th>
                <th>Searches</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {props.searchTerms?.map((therm, index) => (
                <>
                  <tr>
                    {/* FIX THIS SHIT! */}
                    <td key={index}>
                      {therm}
                      {/* {searchTerm.searchterm_title
                        ? searchTerm.searchterm_title
                        : searchTerm.searchTerm_title} */}
                    </td>
                    <td>41</td>
                    <td>Sweden</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Discovery;

// let testArray = ["ost", "mjölk", "brie ost", "filmjöölk", "bregotte", "ost", "mjölk" ]
//   //// remove all duplicated searchtherms
//    // remove duplicate searchterms
//    let uniqueChars = testArray.filter((c, index) => {
//     return testArray.indexOf(c) === index;
//   });
//   console.log(uniqueChars);

//// post keywords
