///////------------  SUMMARY ------------////////
// sammafattad information av valt Project
// länk till settings utav projectet (huvutdinställnigar)
// KOMMANDE: arkivera project , fetch och visa antal keytwords??
////////////////////////////////////////////////////
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeaderTracker from "../../HeaderTracker/HeaderTracker";

const Summary = (props) => {
  const navigate = useNavigate();
  const [saveText, setSaveText] = useState("");



    // on hover, change button
    const changeTextGroupBtn = (e) => {
      setSaveText(e.target.innerText);
      e.target.innerText = "Archive";
    };
  
    const changeBackGroupBtn = (e) => {
      e.target.innerText = saveText;
    };

  ////////-------- Returning following Elements ---------///////////
  return (
    <section className="main summary">
      <header>
        <HeaderTracker currentProject={props.currentProject} />
      </header>
      <header>
        <h1> Project Summary</h1>
      </header>

      <div className="summary_card card">
        <h2>{props.currentProject?.project_name || "loading..."}</h2>
        <div className="summary_card_item">
          <p>URL: </p>{" "}
          <p> {props.currentProject?.project_url || "loading..."}</p>
        </div>
        <div className="summary_card_item">
          <p>Id: </p> <p>{props.currentProject?.project_id || "loading..."}</p>
        </div>
        <div className="summary_card_item">
          <p>Country: </p>{" "}
          <p>{props.currentProject?.project_country || "loading..."}</p>
        </div>
        <div className="summary_card_item">
          <p>Language: </p>{" "}
          <p>{props.currentProject?.project_language || "loading..."}</p>
        </div>
        <div className="summary_card_item">
          <p>Keywords: </p>
          <p> 500</p>
        </div>
        <div className="summary_card_item">
          <p> TaggingGroups: </p>
          <p> 10 </p>
        </div>
        <div className="summary_card_item">
          <p>competitors: </p>
          <p> 5 </p>
        </div>
        <div className="summary_card_item">
          <p>Ranking: </p>
          <p> 75 % completed</p>
        </div>

        <div className="summary_card_buttons">
          <NavLink className="links list_item" to={`../settings`}>
            <div className="">
              <button className="confirm"><i class="far fa-edit"></i>settings</button>
            </div>
          </NavLink>
          <div className="card_select">
            <div>
              <button className="delete change"
                 onMouseEnter={(e) => changeTextGroupBtn(e)}
                 onMouseLeave={(e) => changeBackGroupBtn(e)}
                 > X </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
