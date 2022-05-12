///////------------  SUMMARY ------------////////
// första delan av <table> , <thead>
// checkboxes, med värde "", "1" , "2" , vald checkbox ändrar SearchThermTail till checkbox värdet.
// SearchThermTails värde bestämmer hur vi visar searchTerms i <tbody>
// "" = alla , "1" = singleword , "2" = two words
////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { ShowAllSeachTerhm } from "./ShowAllSeachTerhm";

const OverwievSection = ({
  searchTerms,
  searchTermTail,
  setSearchThermTail,
  chooseSearchTerm,
  setSearchTerms,
  allGroup,
  allTags,
  toggleAllSearchTerms,
  allChecked,
  switsh, // obs byt naman frn switch till ...
  notags,
}) => {
  //const [tagToshow, setTagToshow] = useState([]);

  //// för att filtrera bort alla sökord som inte har något tag...
  console.log(searchTerms.filter((searchTerm) => searchTerm.tag_ids == "0"));

  return (
    <section className="overwiev_section">
      <div className="searchterms_display_options">
        <div className="showAll">
          <strong>Number of search term words</strong>
          <div className="showNum">
            <div className="showNum_checkbox">
              <label>
                All
                <input
                  className="checkbox searchterm_no_radio"
                  name="group"
                  type="radio"
                  value=""
                  checked={searchTermTail === ""}
                  onChange={(e) => setSearchThermTail(e.target.value)}
                  // defaultChecked={searchTermTail}
                />
              </label>
            </div>
            <div className="showNum_checkbox">
              <label>
                1
                <input
                  className="checkbox searchterm_no_radio"
                  name="group"
                  type="radio"
                  value="1"
                  checked={searchTermTail === "1"}
                  onChange={(e) => setSearchThermTail(e.target.value)}
                />
              </label>
            </div>
            <div className="showNum_checkbox">
              <label>
                {" "}
                2
                <input
                  className="checkbox searchterm_no_radio"
                  name="group"
                  type="radio"
                  value="2"
                  checked={searchTermTail === "2"}
                  onChange={(e) => setSearchThermTail(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="showAll">
          <strong>Hide searhterms with no tag</strong>
          <div className="showNum">
            <div className="showNum_checkbox">
              <label>
                {" "}
                switch
                <input
                  className="checkbox searchterm_no_radio"
                  name="group"
                  type="radio"
                  value="true"
                  checked={notags === "true"}
                  onChange={(e) => switsh(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                value={allChecked}
                onChange={() => toggleAllSearchTerms()}
                id="select_all_checkbox"
              />
              <label
                className="searchterm_table_label"
                htmlFor="select_all_checkbox"
              >
                {allChecked ? "DESELECT ALL" : "SELECT ALL"}
              </label>
            </th>

            <th>
              <div className="single_line_th">
                <span>search terms</span>
              </div>
            </th>
            <th>
              <div className="single_line_th">
                <span>searches</span>
              </div>
            </th>

            {allGroup.map((group) => (
              <th key={group.group_id}>
                <div className="table_group_heading">
                  <label htmlFor={`group_select_${group.group_id}`}>
                    {group.group_title}
                  </label>
                  <br />
                  <select
                    className="overwiev_section_select_tag"
                    id={`group_select_${group.group_id}`}
                  >
                    <option value="0"> Show all tags</option>
                    {allTags.map((tag) =>
                      tag.group_id === group.group_id ? (
                        <option value={tag.tag_title}> {tag.tag_title} </option>
                      ) : null
                    )}
                  </select>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* This should be changed to be more compact. A lot of repetition */}

          {searchTerms.map((searchTerm) => {
            if (searchTermTail === "2" && searchTerm.black_list !== 1) {
              if (searchTerm.searchterm_title.includes(" ")) {
                return (
                  <ShowAllSeachTerhm
                    searchTerms={searchTerms}
                    searchTerm={searchTerm}
                    allGroup={allGroup}
                    allTags={allTags}
                    chooseSearchTerm={chooseSearchTerm}
                    searchTermTail={searchTermTail}
                    setSearchTerms={setSearchTerms}
                  />
                );
              }
            } else if (searchTermTail === "1" && searchTerm.black_list !== 1) {
              if (!searchTerm.searchterm_title.includes(" ")) {
                return (
                  <ShowAllSeachTerhm
                    searchTerms={searchTerms}
                    searchTerm={searchTerm}
                    allGroup={allGroup}
                    allTags={allTags}
                    chooseSearchTerm={chooseSearchTerm}
                    searchTermTail={searchTermTail}
                    setSearchTerms={setSearchTerms}
                  />
                );
              }
            } else if (searchTerm.black_list !== 1) {
              return (
                <ShowAllSeachTerhm
                  searchTerms={searchTerms}
                  searchTerm={searchTerm}
                  allGroup={allGroup}
                  allTags={allTags}
                  chooseSearchTerm={chooseSearchTerm}
                  searchTermTail={searchTermTail}
                  setSearchTerms={setSearchTerms}
                />
              );
            }
            //  else if (searchTerm.black_list !== 1) {
            //   if (searchTerm.tag_ids == "0") {
            //     return (
            //       <ShowAllSeachTerhm
            //         searchTerms={searchTerms}
            //         searchTerm={searchTerm}
            //         allGroup={allGroup}
            //         allTags={allTags}
            //         chooseSearchTerm={chooseSearchTerm}
            //         searchTermTail={searchTermTail}
            //         setSearchTerms={setSearchTerms}
            //       />
            //     );
            //   }
            // }
          })}
        </tbody>
      </table>
    </section>
  );
};

export default OverwievSection;

// const [filteredTerms, setFilteredTerms] = useState();

// //// choose what searchterms to show
// const selectTag = () => {
//   console.log(tagToshow);
//   console.log(searchTerms.map((terms) => terms.tag_ids.includes(tagToshow)));
//   let trueTerms = [];
//   trueTerms = searchTerms.filter((terms) =>
//     terms.tag_ids.includes(tagToshow)
//   );
//   // console.log(trueTerms.map((term) => term.searchterm_title));
//   setFilteredTerms(trueTerms);

//   console.log(filteredTerms);
// };

// //selectTag();

// useEffect(() => {
//   console.log(tagToshow);

//   selectTag();
//   // if (tagToshow != "") {
//   //   selectTag();
//   // } else {
//   //   setSearchTerms(searchTerms);
//   // }
// }, [tagToshow]);
