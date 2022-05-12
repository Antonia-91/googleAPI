///////------------  SUMMARY ------------////////
// posta searchtemrs till blacklist.
// remove searchterm från blacklist 
// OM ett searchterm befinner sig i blacklist så skall den inte räknas med  i Ranking.js
// KVAR ATT GÖRA:  sortera bort searchterms i blacklist så dom inte skickas med till ranking
////////////////////////////////////////////////////

import { useState } from "react";
import { FaFolderPlus } from "react-icons/fa";

const BlackList = ({
  showBlacklist,
  deleteFromBlkList,
  // addToBlacklist,
  searchTerms,
  setSearchTerms,
  // removeFromBlacklist,
}) => {
  const [saveText, setSaveText] = useState("");

  //// Delete from blacklist 
  const removeFromBlacklist = async (id) => {
    const res = await fetch(
      "http://localhost:5001/searchTerms/removeFromBlacklist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTermId: id }),
      }
    );
    const data = await res.json();

    let currentSearchTermState = [...searchTerms];
    currentSearchTermState.forEach((searchterm) => {
      if (searchterm.searchterm_id === id) {
        searchterm.black_list = 0;
      }
    });
    setSearchTerms(currentSearchTermState);
  };
//// post to blacklist 
  const addToBlacklist = async () => {
    let checked = [];
    console.log(checked);
    console.log(searchTerms);

    searchTerms.forEach((searchTerm) => {
      if (searchTerm.checked) {
        checked = [...checked, searchTerm.searchterm_id];
      }
    });
    if (checked.length > 0) {
      const res = await fetch(
        "http://localhost:5001/searchTerms/addToBlacklist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checked),
        }
      );
      const data = await res.json();
      let currentSearchTermState = [...searchTerms];
      currentSearchTermState.forEach((searchterm) => {
        if (checked.includes(searchterm.searchterm_id)) {
          searchterm.black_list = 1;
          searchterm.checked = false;
        }
      });
      setSearchTerms(currentSearchTermState);
    }
  };

  //// omhover, change text
  const changeTextGroupBtn = (e) => {
    setSaveText(e.target.innerText);
    e.target.innerText = "remove from blk";
  };

  const changeBackGroupBtn = (e) => {
    e.target.innerText = saveText;
  };
  // console.log(searchTerms.map((therm) => (therm.blkList === 1 ? "yes" : "no")));

  ////////-------- Returning following Elements ---------///////////
  return (
    <div className={showBlacklist ? "blkList_section_wrapper" : "hide"}>
      <div className={showBlacklist ? "blkList" : "hide"}>
        <div className="blkList_header">
          <h5 className="blkList_title">Blacklist</h5>
          <button className="blacklist_btn" onClick={addToBlacklist}>
            <FaFolderPlus style={{marginRight: "4px"}}/>
           Add searchterm
          </button>
        </div>
        <div className="blkList_searchterm_wrapper">
          {searchTerms.map((term) =>
            term.black_list === 1 ? (
              <div className="blkList_searchterm" key={term.searchtherm_id}>
                <p>{term.searchterm_title}</p>
                <button
                  onMouseEnter={(e) => changeTextGroupBtn(e)}
                  onMouseLeave={(e) => changeBackGroupBtn(e)}
                  className="delete_btn change"
                  onClick={() => removeFromBlacklist(term.searchterm_id)}
                >
                  x
                </button>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default BlackList;
