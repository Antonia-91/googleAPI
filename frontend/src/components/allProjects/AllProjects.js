///////------------  SUMMARY ------------////////
// fetach alla project fråm Db
// funktionallitet för att sortera datan i viss ordning
// länkar redirectar till valt project, skickar med projectets id 
// KOMMANDE! favorisera ett project Samt Arcivera ett Project 
////////////////////////////////////////////////////

import { useState, useEffect} from "react";
import { useNavigate, NavLink } from "react-router-dom";

const AllProjects = (props) => {
  const [data, setData] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);

  const navigate = useNavigate();

  ////// setData /////
  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData();
      setData(dataFromServer);
    };
    getData();
  }, []);

  ///// Fetch Data /////
  const fetchData = async () => {
    const res = await fetch("http://localhost:5001/projects");
    const data = await res.json();
    //console.log(data.mockData[0].project_name);

    return data;
  };

  ///// sort data //////
  const sort = () => {
    let sorted = data.sort(compare);
    console.log(sorted);
    setSortedArray(sorted);
    //setData(sorted)
  };

  function compare(a, b) {
    if (a.project_name < b.project_name) {
      return -1;
    }
    if (a.project_name > b.project_name) {
      return 1;
    }
    return 0;
  }
  ////////-------- Returning followong Elements ---------///////////////

  return (
    <>
      <section className="main">
        <header>
          <h1>All Projects</h1>
          <button className="goBack" onClick={() => navigate(-1)}>
            Go back
          </button>
        </header>

        <div className="filter_section">
          <div>
            <i className="far fa-search"></i>
            <input placeholder="seartch project... " />
          </div>
          <div className="filter_section_filter">
            <p onClick={sort}>Alfabetisk ordning</p>
            <p>Show all</p>
            <p>Show favorites</p>
            <p> Show archived</p>
          </div>
          <div>
            <NavLink className="links" to="/newProject">
              <button className="btn"> New Project</button>
            </NavLink>
          </div>
        </div>

        <div className="allProject_wrapper">
          <div className="allProject_header">
            <p>Project</p>
            <p>URL</p>
            <p>Settings</p>
          </div>
          {data.map((d) => (
            <div className="project_wrapper" key={d.id}>
              <div className="project_children_div">
                <input type="radio" className="allProject_children_input" />
                <NavLink
                  className="links list_item"
                  to={`/project/${d.project_id}/summary`}
                >
                  {d.project_name}
                </NavLink>
              </div>
              <div className="project_children_div project_children_div_url">
                {" "}
                www.url.se{" "}
              </div>
              <div className="project_wrapper_buttons project_children_div">
                <div>
                  <NavLink
                    className="links list_item"
                    to={`/project/${d.project_id}/settings`}
                  >
                    <button> Settings</button>
                  </NavLink>
                </div>
                <div className="project_wrapper_chois">
                  <input type="radio" />
                  <label> Favorite</label>
                </div>
                <div className="project_wrapper_chois">
                  <input type="radio" />
                  <label> Archive</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllProjects;
