///////------------  SUMMARY ------------////////
// Landnings-sidan när man loggat in. Överblick över alla verktyg (Just nu finns bara MIA TOOL) 
// Länk till MIA Tool och skapa nytt project
// KOMMANDE: integrera fler verktyg 
////////////////////////////////////////////////////

import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  
  ////////-------- Returning following Elements ---------///////////
  return (
    <section className="main">
      <div className="landingpage_wrapper">
        <div className="landingpage_section">
          <h1> MIA Tool</h1>
          <div>
            <NavLink className="links" to="/allProjects">
              {/*Having an h3 here is unsemantic*/}
              <p>All projects</p>
            </NavLink>
          </div>
          <div>
            <NavLink className="links" to="/newProject">
              <p>New project</p>
            </NavLink>
          </div>
        </div>

        <div className="landingpage_section">
          <h1> X Tool</h1>
          <div>
            <p>Another tool </p>
          </div>
          <div>
            <p>All projects </p>
          </div>
        </div>

        <div className="landingpage_section">
          <h1> X Tool</h1>
          <div>
            <p>Another tool </p>
          </div>
          <div>
            <p>All projects </p>
          </div>
        </div>

        <div className="landingpage_section">
          <h1> X Tool</h1>
          <div>
            <p>Another tool </p>
          </div>
          <div>
            <p>All projects </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
