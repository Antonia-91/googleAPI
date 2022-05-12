///////------------  SUMMARY ------------////////
// navbar : LOGGA - Länk till landningssidan - Loggain loggaut knapp
// setUser återfinns i contex.js 
// if user = true ... inloggad 
////////////////////////////////////////////////////

import React from "react";
import { useState, useContext } from "react";
import { MyContext } from "../../contex";
import { useNavigate, NavLink } from "react-router-dom";

const Nav = () => {
  const { user, setUser } = useContext(MyContext);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setUser(null);
  };

  //console.log(user)

  ////////-------- Returning following Elements ---------///////////
  return (
    <nav>
      <img
        src="./NM_LOGO_WHITE.png"
        alt="The Nordic Morning logo"
        className="nm_logo"
      />
      <div className="company_name">
        <NavLink 
        activeclassname="NordicMornging_active"
        className="links NordicMornging" to={`/`}>
          {" "}
          <h3>Nordic Morning Market Insight</h3>
        </NavLink>
      </div>
      <div className="nav_logout">
        <p>
          {" "}
          <i className="far fa-user"></i> {user.name}
        </p>

        <button className="btn_logout" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
