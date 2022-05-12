///////------------  SUMMARY ------------////////
// Delete grupp
// Delete tag i grupp
////////////////////////////////////////////////////

import { useState } from "react";

const GroupSection = ({
  allGroup,
  setAllGroup,
  allTags,
  setAllTags,
  chooseThisTag,
  // deleteTag,
  showAllGroup,
  currentProject,
}) => {
  const [saveText, setSaveText] = useState("");

  ///// on delete Group
  const deleteGroup = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure?")) {
      await fetch(`http://localhost:5001/groups/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "deleted group succes") {
            let upDateAllGroups = allGroup.filter(
              (group) => group.group_id !== id
            );
            setAllGroup(upDateAllGroups);
          }
        });
    }
  };

  ///// on Delete tag
  const deleteTag = async (e, id) => {
    console.log(id);

    if (window.confirm("delete this tag?")) {
      await fetch(
        `http://localhost:5001/tag/delete/${id}/${currentProject.project_id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "delete tag succes") {
            // With this setup, the searchterms still include the tag ids after delete but won't display them. Works?
            let upDateAllTags = allTags.filter((tag) => tag.tag_id !== id);
            console.log("upDateAllTags", upDateAllTags);
            setAllTags(upDateAllTags);
          }
        });
    }
  };

  // on hover, change button
  const changeTextGroupBtn = (e) => {
    setSaveText(e.target.innerText);
    e.target.innerText = "Delete this Group";
  };

  const changeBackGroupBtn = (e) => {
    e.target.innerText = saveText;
  };

  // on hover, change button
  const changeTextTagBtn = (e) => {
    setSaveText(e.target.innerText);
    e.target.innerText = "Delete this Tag";
  };

  const changeBackTagBtn = (e) => {
    e.target.innerText = saveText;
  };

  ////////-------- Returning following Elements ---------///////////
  return (
    <div className="allGroups_section_wrapper">
      {allGroup.map((group) => (
        <div
          className={showAllGroup ? "group_section" : "hide"}
          key={group.group_id}
        >
          <div
            className="group_section_header"
            onClick={(e) => deleteGroup(group.group_id)}
          >
            <h5>{group.group_title}</h5>{" "}
            <button
              className="delete_btn change"
              onMouseEnter={(e) => changeTextGroupBtn(e)}
              onMouseLeave={(e) => changeBackGroupBtn(e)}
            >
              x
            </button>
          </div>
          {allTags?.map((tag) =>
            tag.group_id === group.group_id ? (
              <>
                <div
                  key={tag.tag_id}
                  className="group_section_tag"
                  style={{ background: tag.tag_color }}
                  onClick={(e) => chooseThisTag(e, tag.tag_id, tag.group_id)}
                >
                  <p className="tag_title"> {tag.tag_title}</p>
                  <button
                    className="delete_btn change"
                    onMouseEnter={(e) => changeTextTagBtn(e)}
                    onMouseLeave={(e) => changeBackTagBtn(e)}
                    onClick={(e) => deleteTag(e, tag.tag_id)}
                  >
                    x
                  </button>
                </div>
              </>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupSection;
