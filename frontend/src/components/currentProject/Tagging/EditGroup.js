///////------------  SUMMARY ------------////////
// posta ny tag till befintlig grupp 
////////////////////////////////////////////////////

const EditGroup = ({
  setAddTag,
  addTag,
  seclectedGroup,
  colors,
  currentProject,
  setAllTags,
  allTags,
  // setCurrentColorToTag,
  setSelectedGroup,
  allGroup,
}) => {
  ///// edit group / post new tag
  const addNewTag = async (e) => {
    console.log(addTag, seclectedGroup);

    let tagsTofiler = allTags.filter((tag) => tag.group_id === seclectedGroup);
    console.log(tagsTofiler);
    let position = tagsTofiler.length;
    console.log(position);

    let newColor = colors[position % colors.length];
    console.log(newColor);
    // setCurrentColorToTag(newColor);

    let addingTag = {
      group_id: seclectedGroup,
      tag_title: addTag,
      project_id: currentProject.project_id,
      tag_color: newColor,
    };

    console.log(addingTag);

    await onAddTag(addingTag);

    setAddTag("");
  };

  ///// post new Tag to Group
  const onAddTag = async (addingTag) => {
    // console.log(addingTag);
    const res = await fetch("http://localhost:5001/tag/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(addingTag),
    });
    const data = await res.json();
    console.log(data);
    //return data;

    if (data.message === "ok") {
      let newTagToAdd = {
        group_id: seclectedGroup,
        project_id: currentProject.project_id,
        tag_id: data.tagId,
        tag_title: addTag,
        searchTerm_ids: null,
        tag_color: addingTag.tag_color,
      };
      console.log(newTagToAdd);
      setAllTags((prevState) => [...prevState, newTagToAdd]);
    }
  };

  ////////-------- Returning following Elements ---------///////////
  return (
    <div className="edit_group">
      <p>Edit Group</p>
      <select onChange={(e) => setSelectedGroup(parseInt(e.target.value))}>
        <option>Groups</option>
        {allGroup?.map((group) => (
          <option value={group.group_id} key={group.group_id}>
            {group?.group_title}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add tag..."
        value={addTag}
        onChange={(e) => setAddTag(e.target.value)}
      />
      <button className="btn_confirm" onClick={addNewTag}>
        Save
      </button>
    </div>
  );
};

export default EditGroup;
