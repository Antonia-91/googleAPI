///////------------  SUMMARY ------------////////
// Denna komponent renderar endast ut knappar/länkar till underkomponetenrna för CurrentProject:
//- summary  - discovery - tagging - ranking - presentation -
////////////////////////////////////////////////////

import { useNavigate, NavLink, useParams } from "react-router-dom";

const HeaderTracker = (props) => {
  ////////-------- Returning following Elements ---------///////////
  return (
    <div className="header_tracker">
      <div className="header_projectName">
        <h1> {props.currentProject?.project_name} </h1>
      </div>
      <div className="tracker_buttons_holders">
        <div className="tracker_buttons_holder">
          <NavLink
            activeclassname="active"
            className="btn_tracker links"
            to={`../summary`}
          >
            {" "}
          </NavLink>
          <p>Summary</p>
        </div>
        <div className="tracker_buttons_holder">
          <NavLink
            activeclassname="active"
            className="btn_tracker links"
            to={`../discovery`}
          >
            {" "}
          </NavLink>
          <p>Discovery</p>
        </div>

        <div className="tracker_buttons_holder">
          <NavLink
            activeclassname="active"
            className="btn_tracker links"
            to={`../tagging`}
          >
            {" "}
          </NavLink>
          <p>Tagging</p>
        </div>

        <div className="tracker_buttons_holder">
          <NavLink
            activeclassname="active"
            className="btn_tracker links"
            to={`../ranking`}
          >
            {" "}
          </NavLink>
          <p>Ranking</p>
        </div>

        <div className="tracker_buttons_holder">
          <NavLink
            activeclassname="active"
            className="btn_tracker links"
            to="../presentation"
          >
            {" "}
          </NavLink>
          <p>Presentation</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderTracker;
