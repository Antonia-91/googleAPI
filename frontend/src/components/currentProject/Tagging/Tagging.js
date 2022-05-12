///////------------  SUMMARY ------------////////
//  currentProject, get  alla sparade grupper, sparde tags och searchtemrs
// posta searchterm to tag
// OBS ändra alla Alert till confirms!!!!
// Kommande : filtrening i table, änra view av Grupper/blacklist...

////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { MyContext } from "../../../contex";
import HeaderTracker from "../../HeaderTracker/HeaderTracker";
import NewGroup from "./NewGroup";
import EditGroup from "./EditGroup";
import GroupSection from "./GroupSection";
import BlackList from "./BlackList";
import OverwievSection from "./OverwievSection";
import ShowAllSeachTerhm from "./ShowAllSeachTerhm";

const Tagging = (props) => {
  //console.log(props.searchTerms)
  const [showBlacklist, setShowBlacklist] = useState(false);
  const [showAllGroup, setShowAllGroup] = useState(true);
  const [showtagInTable, setShowtagInTable] = useState(true); // is this one necessary?
  //// state of group & tag & array of allGroups /////
  const [searchTerms, setSearchTerms] = useState([]);
  const [allGroup, setAllGroup] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [tag, setTag] = useState();
  const [seclectedGroup, setSelectedGroup] = useState();
  const [addTag, setAddTag] = useState();
  //const [color, setCurrentColorToTag] = useState(); is this one necessary?
  const [selectedtag, setSelectedTag] = useState("");
  const [searchTermTail, setSearchThermTail] = useState("");
  const [allChecked, setAllChecked] = useState(false);
  const [notags, setNotags] = useState(true);
  const navigate = useNavigate();

  //// colors that are given to each searchterm
  let colors = [
    "#03695B",
    "#DE6666",
    "#3B78D8",
    "#F6B16A",
    "#FAEFB4",
    "#383760",
    "#821F34",
    "#FBE9E5",
    "#22626E",
    "#E7E6E6",
    "#A5C2F4",
    "#D5A5BD",
    "#B5D7A7",
  ];

  ///// Fetch all searchterms /////
  useEffect(() => {
    const getProjectSearchTerms = async () => {
      let idToServer = props.currentProject?.project_id;

      let searchTermsFromServer = await fetchProjectSearchTerms(idToServer);
      console.log(searchTermsFromServer);

      searchTermsFromServer.forEach((searchTerm) => {
        searchTerm.checked = false;
        if (searchTerm.tag_ids) {
          let tagsArray = searchTerm.tag_ids.split(",");
          searchTerm.tag_ids = tagsArray;
        }
      });

      //  searchTermsFromServer = searchTermsFromServer.filter(
      //   (value, index, self) =>
      //     index !==
      //     self.findIndex(
      //       (t) => t.place === value.place && t.name === value.name
      //     )
      // );
      // console.log(searchTermsFromServer);

      // remove all duplicated searchtherms
      const filteredArr = searchTermsFromServer.reduce((acc, current) => {
        const x = acc.find(
          (item) => item.searchterm_title === current.searchterm_title
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      console.log(filteredArr);

      setSearchTerms(filteredArr);
    };
    getProjectSearchTerms();
  }, [props.currentProject]);

  console.log(searchTerms);

  ///// fetch project searchTerms
  const fetchProjectSearchTerms = async (id) => {
    const res = await fetch(`http://localhost:5001/searchTerms/${id}`);
    const data = await res.json();

    return data;
  };

  //////Fetch All Groups & TAGS from db
  useEffect(() => {
    const getGroups = async () => {
      let idToServer = props.currentProject?.project_id;

      const groupsFromServer = await fetchGroups(idToServer);

      let filteredGroups = groupsFromServer.filter(
        (obj) => "group_title" in obj
      );

      let filteredTags = groupsFromServer.filter((obj) => "tag_title" in obj);

      setAllGroup(filteredGroups);
      setAllTags(filteredTags);
    };
    getGroups();
  }, [props.currentProject]);

  ///// fetch All GROUPS & TAGS
  const fetchGroups = async (id) => {
    const res = await fetch(`http://localhost:5001/groups/${id}`);
    const data = await res.json();
    // console.log(data);
    return data;
  };

  ///// on searchTerms checked
  const chooseThisTag = async (e, tag, group) => {
    console.log(e.target);
    if (e.target.className !== "delete_btn change") {
      setSelectedTag(tag);

      let tagInfo = [tag, group];
      let checked = [];

      searchTerms.forEach((searchTerm) => {
        if (searchTerm.checked) {
          checked = [...checked, searchTerm.searchterm_id];
        }
      });
      //First subarray represents the checked search terms, the second represents the tag id and its group id
      let concatArray = [...[checked], tagInfo];
      console.log(concatArray);

      await onAddTagToSearchTerm(concatArray);
    }
  };

  /// update state, checked searchTerms in state "setSearchTerms"
  const chooseSearchTerm = (e) => {
    let value = e.target.checked;
    let parentId = e.target.parentNode.parentNode.id;
    //console.log(parentId);
    let currentSearchTermState = [...searchTerms];

    currentSearchTermState.forEach((searchTerm) => {
      if (searchTerm.searchterm_id === parseInt(parentId)) {
        searchTerm.checked = value;
      }
    });
    setSearchTerms(currentSearchTermState);
  };

  const onAddTagToSearchTerm = async (concatArray) => {
    const res = await fetch(`http://localhost:5001/searchTerms/tags/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(concatArray),
    });
    if (res.status === 200) {
      const data = await res.json();
      //console.log(data);
      let currentSearchTermState = [...searchTerms];
      //console.log(currentSearchTermState);

      // Should this be wrapped in an if to prevent state update if there's no difference?
      // Find changed searchterms and update their tag ids.
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < currentSearchTermState.length; j++) {
          if (
            data[i].searchTermAffected ===
            currentSearchTermState[j].searchterm_id
          ) {
            //console.log(currentSearchTermState[j].tag_ids);
            currentSearchTermState[j].tag_ids = data[i].newTags.split(",");
            //console.log(currentSearchTermState[j].tag_ids);
          }
        }
      }

      //console.log(currentSearchTermState);
      setSearchTerms(currentSearchTermState);
    } else {
      console.log("Something went wrong, try again!");
    }
  };

  /// toggleAllSearchterms
  const toggleAllSearchTerms = () => {
    setAllChecked((prevState) => !prevState);
    let currentSearchTermState = [...searchTerms];
    currentSearchTermState.forEach((searchterm) => {
      searchterm.checked = !allChecked;
    });
    setSearchTerms(currentSearchTermState);
  };

  /// switsh
  const switsh = (e) => {
    console.log(e);
    setNotags((prevState) => !prevState);
  };

  console.log(notags);

  ////////-------- Returning following Elements ---------///////////
  if (!allGroup) return null;
  return (
    <>
      <header>
        <HeaderTracker currentProject={props.currentProject} />
      </header>

      <section className="tagging_wrapper">
        <NewGroup
          groupName={groupName}
          setGroupName={setGroupName}
          tag={tag}
          setTag={setTag}
          currentProject={props.currentProject}
          setAllTags={setAllTags}
          setAllGroup={setAllGroup}
        />
        <EditGroup
          setAddTag={setAddTag}
          addTag={addTag}
          seclectedGroup={seclectedGroup}
          setSelectedGroup={setSelectedGroup}
          allGroup={allGroup}
          colors={colors}
          currentProject={props.currentProject}
          setAllTags={setAllTags}
          allTags={allTags}
          // setCurrentColorToTag={setCurrentColorToTag}
        />
      </section>

      <section className="allGroups_section">
        <div className="allGroups_section_title">
          <div
            className="tab"
            onClick={() => setShowAllGroup((presState) => !presState)}
          >
            <p>All Groups</p>
          </div>
          <div
            className="tab"
            onClick={() => setShowBlacklist((presState) => !presState)}
          >
            <p>Blacklist</p>
          </div>
        </div>

        <GroupSection
          showAllGroup={showAllGroup}
          allGroup={allGroup}
          setAllGroup={setAllGroup}
          allTags={allTags}
          setAllTags={setAllTags}
          chooseThisTag={chooseThisTag}
          currentProject={props.currentProject}
          // deleteTag={deleteTag}
        />
        <BlackList
          showBlacklist={showBlacklist}
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
        />
      </section>

      {/* <section className="overwiev_section"> */}

      {/* </section> */}

      <OverwievSection
        searchTerms={searchTerms}
        setSearchTerms={setSearchTerms}
        allGroup={allGroup}
        allTags={allTags}
        searchTermTail={searchTermTail}
        setSearchThermTail={setSearchThermTail}
        allChecked={allChecked}
        toggleAllSearchTerms={toggleAllSearchTerms}
        chooseSearchTerm={chooseSearchTerm}
        notags={notags}
        switsh={switsh}
      />
    </>
  );
};

export default Tagging;
