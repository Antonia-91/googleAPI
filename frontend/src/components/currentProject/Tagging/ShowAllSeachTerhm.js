///////------------  SUMMARY ------------////////
// för varje searchterm, rendera en <tr> i <tbody> 
// Remove en tag från ett searchterm
////////////////////////////////////////////////////

import { useState } from "react";

export const ShowAllSeachTerhm = ({
  searchTerm,
  allGroup,
  allTags,
  chooseSearchTerm,
  searchTerms,
  setSearchTerms,
 
}) => {
  const [saveText, setSaveText] = useState("");

  //// remove searchterm from tag
  const deleteThis = async (id1, id2) => {
    console.log(id1, id2);
    let tagId = id1.toString();

    let objInfo = {
      tagId: tagId,
      seachterm_id: id2,
    };

    await removeTagids(objInfo);
  };

  /////post tag_id and seartcherms.tag_ids to backend
  const removeTagids = async (objInfo) => {
    const res = await fetch("http://localhost:5001/searchTerms/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objInfo),
    });
    const data = await res.json();
    /// if success, update frontend state
    if (data.message === "update succes") {
      let filtered = searchTerms.filter(
        (term) => term.searchterm_id === objInfo.seachterm_id
      );
      let newTagIds = data.newTag_ids.split(",");

      let newSeatchtermState = [...searchTerms];
      newSeatchtermState.forEach((element) => {
        if (element.searchterm_id === data.searchTermId) {
          element.tag_ids = newTagIds;
        }
      });
      setSearchTerms(newSeatchtermState);
    }
  };

  //// on hover tags in table
  const changeText = (e) => {
    setSaveText(e.target.innerText);
    e.target.innerText = "remove";
  };

  const changeBack = (e) => {
    e.target.innerText = saveText;
  };

  ////////-------- Returning following Elements ---------///////////
  return (
    <tr key={searchTerm.searchterm_id} id={searchTerm.searchterm_id}>
      <td>
        <input
          type="checkbox"
          value={searchTerm.checked}
          checked={searchTerm.checked}
          onChange={(e) => chooseSearchTerm(e)}
        />
      </td>
      <td>
        <span>{searchTerm.searchterm_title}</span>
      </td>
      <td>
        <span>41</span>
      </td>

      {allGroup.map((group) => (
          <td className="tag_td">
            {allTags.map((tag) => {
              if (
                searchTerm.tag_ids?.includes(tag.tag_id.toString()) &&
                group.group_id === tag.group_id
              ) {
                return (
                  <span
                    onClick={() =>
                      deleteThis(tag.tag_id, searchTerm.searchterm_id)
                    }
                    onMouseEnter={(e) => changeText(e)}
                    onMouseLeave={(e) => changeBack(e)}
                    className="tag_span"
                    style={{ background: tag.tag_color }}
                  >
                    {tag.tag_title}
                  </span>
                );
              }
            })}
          </td>
      ))}
    </tr>
  );
};

export default ShowAllSeachTerhm;
