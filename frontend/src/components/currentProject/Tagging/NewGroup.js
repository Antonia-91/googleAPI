///////------------  SUMMARY ------------////////
// posta ny grupp 
////////////////////////////////////////////////////

const NewGroup = ({
  groupName,
  setGroupName,
  tag,
  setTag,
  currentProject,
  setAllTags,
  setAllGroup,
}) => {
  const addGroup = async (e) => {
    e.preventDefault();

    let newGroup = {};

    if (tag === "") {
      newGroup = {
        group_title: groupName,
        project_id: currentProject.project_id,
      };
    } else {
      newGroup = {
        group_title: groupName,
        tag_title: tag,
        project_id: currentProject.project_id,
        tag_color: "aliceblue",
      };
    }

    await onAdd({ newGroup });
    setGroupName("");
    setTag("");
  };

  ///// post new group
  const onAdd = async (newGroup) => {
    const res = await fetch("http://localhost:5001/groups/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newGroup),
    });
    const data = await res.json();
    //console.log(data);

    if (data.message === "Successfully Registered") {
      let group = {
        group_id: data.groupId,
        group_title: groupName,
        project_id: currentProject.project_id,
      };
      if (data.tagId) {
        let newTag = {
          group_id: data.groupId,
          project_id: currentProject.project_id,
          tag_id: data.tagId,
          tag_title: tag,
          searchTerm_ids: null,
          tag_color: "aliceblue",
        };
        setAllTags((prevState) => [...prevState, newTag]);
      }

      setAllGroup((prevState) => [...prevState, group]);
    }
  };

  ////////-------- Returning following Elements ---------///////////
  return (
    <>
      <form className="new_group" onSubmit={addGroup}>
        <p>New Group</p>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group name..."
        />
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Add tag..."
        />
        <button className="btn_confirm" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default NewGroup;
