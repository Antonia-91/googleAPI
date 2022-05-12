///////------------  SUMMARY ------------////////
// Håller i alla Routes till currentProject
// plockar ut pojectets id från URL
// gör en fetch med id från URL, fårtillbaka data om valt project
// sätter datan i ett State som vi kallar "currentProject"
// currentProject skickas ner som props i vajre ny sida som behöver datan.
// fethar våra keywords

////////////////////////////////////////////////////

import Summary from "./Summary/Summary";
import NewProject from "../NewProject/NewProject";
import Discovery from "./Discovery/Discovery";
import Tagging from "./Tagging/Tagging";
import Ranking from "./Ranking/Ranking";
import Presentation from "./Presentation/Presentation";
import { useParams, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// import HeaderTracker from "../HeaderTracker/HeaderTracker";

const CurrentProject = ({ runScarper }) => {
  const [currentProject, setCurrentProject] = useState();
  const [searchTerms, setSearchTerms] = useState();

  let { projectId } = useParams();

  ///// Set data till currentProject
  useEffect(async () => {
    getProject(projectId);
    getSearchTerms();
  }, []);

  ///// fetch singel project
  const getProject = async (id) => {
    const res = await fetch(`http://localhost:5001/projects/${id}`);
    const data = await res.json();
    //console.log(data)
    await setCurrentProject(data[0]);
  };
  ///// post searchTerms to this project
  const saveSearchTerms = async (searchTermArray) => {
    // setSearchTerms(searchTermArray);
    console.log(searchTermArray);
    const res = await fetch(
      `http://localhost:5001/searchTerms/${projectId}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchTermArray),
      }
    );
    const data = await res.json();
    if (data.message === "ok") {
      setSearchTerms(searchTermArray);
    } else {
      console.log("Something went wrong :( ");
    }
  };
  ///// Hämta Serchterms från db
  // TODO: Make this the only fetch for search terms.
  const getSearchTerms = async () => {
    const res = await fetch(`http://localhost:5001/searchTerms/${projectId}`);
    const data = await res.json();
    //console.log(data);

    let titles = data.map((therm) => therm.searchterm_title);
    //console.log(titles);

    // remove duplicate searchterms

    let uniqueChars = titles?.filter((c, index) => {
      return titles.indexOf(c) === index;
    });
    // console.log(uniqueChars);

    setSearchTerms(uniqueChars);
  };

  ////////-------- Returning followong Elements ---------///////////
  return (
    <section className="main">
      <Routes>
        <Route
          path="summary"
          element={<Summary currentProject={currentProject} />}
        />
        <Route
          path="settings"
          element={<NewProject currentProject={currentProject} />}
        />
        <Route
          path="discovery"
          element={
            <Discovery
              currentProject={currentProject}
              saveSearchTerms={saveSearchTerms}
              searchTerms={searchTerms}
            />
          }
        />
        <Route
          path="tagging"
          element={
            <Tagging
              currentProject={currentProject}
              searchTerms={searchTerms}
            />
          }
        />
        <Route
          path="ranking"
          element={<Ranking currentProject={currentProject} />}
        />
        <Route
          path="presentation"
          element={<Presentation currentProject={currentProject} />}
        />
      </Routes>
    </section>
  );
};

export default CurrentProject;
