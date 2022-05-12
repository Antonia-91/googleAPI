import { useEffect, useState, useContext } from "react";
import { useNavigate, NavLink, useParams, useLocation } from "react-router-dom";
import { MyContext } from "../../contex";

//----- NEW PROJECT / SETTINGS -----//
// -New Project and Settings are the same component. New Project renders empty, while settings renders with current project info in input fields.
// The mock data below could be moved to the backend for easier customization, but should either way be renamed.
// Project data is fetched in Current Project rather than here. Thus, all project info is conveyed through props.
// There is a rather large rebuild of the NewProject component in the works which includes a massive rebuild of the way calls to the db in the backend are handeled. Postponed for LIA2 period.


//This components might have to be rebuilt so that the competitor section is not part of the form. When submitting, competitor info should be taken from state.
//Component needs to be broken down
const NewProject = (props) => {
  console.log(props);
  const [saveText, setSaveText] = useState("");


  //To be changed to live data from backend in prod.
  const mockData = [
    {
      ad_words_account: ["services.se@nordicmorning.com"],
      languages: ["Swedish", "Finnish", "English", "Norwegian"],
      countries: ["Sweden", "Finland", "Great Britain", "Norway"],
      locales: ["https://www.google.se/search?q={0}"],
    },
  ];

  //This hook is for the options data. Perhaps a renaming would be suitable.
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    project_name: "",
    url: "",
    ad_words_account: "init-option",
    language: "init-option",
    country: "init-option",
    locale: "https://www.google.se/search?q={0}",
    device: "",
    twod_tagging: false,
  });
  //Competitors are added to state when ADD is pressed. Only added to db on press on SAVE.
  const [competitors, setCompetitors] = useState([]);
  const [newCompetitor, setNewCompetitor] = useState({
    competitor_name: "",
    competitor_url: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (props.currentProject) {
      setFormData((prevState) => ({
        ...prevState,
        project_name: props.currentProject?.project_name,
      }));
    }
  }, [props.currentProject]);
  const urlPath = useLocation();

  useEffect(() => {
    //To be changed to fetch to backend in prod.
    setData(mockData);
  }, []);

  const handleFormChange = (e) => {
    let name = e.target.name;
    let value;
    if (e.target.name === "twod_tagging") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleCompetitorChange = (e) => {
    const { name, value } = e.target;
    setNewCompetitor((prevState) => ({ ...prevState, [name]: value }));
  };

  const addCompetitor = () => {
    const competitorToAdd = {
      competitor_name: newCompetitor.competitor_name,
      competitor_url: newCompetitor.competitor_url,
    };
    setCompetitors((oldCompetitors) => [...oldCompetitors, competitorToAdd]);
  };
  const deleteCompetitor = (e) => {
    const parentId = e.target.parentElement.id;
    const oldCompetitors = [...competitors];
    const newCompetitors = oldCompetitors.filter(
      (obj) => obj.competitor_name !== parentId
    );
    setCompetitors(newCompetitors);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(competitors);
    const responseFromServer = await sendFormData();
    console.log(responseFromServer);
  };
  const sendFormData = async () => {
    const res = await fetch("http://localhost:5001/projects/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData: formData, competitorData: competitors }),
    });
    const data = res.json();
    return data;
  };


  // on hover, change button
  const changeTextTagBtn = (e) => {
    setSaveText(e.target.innerText);
    e.target.innerText = "Remove";
  };

  const changeBackTagBtn = (e) => {
    e.target.innerText = saveText;
  };


  // useEffect(() => {
  //     const getData = async () => {
  //       const dataFromServer = await fetchData();
  //       setData(dataFromServer);
  //     };
  //     getData();
  //   }, []);

  //   ///// Fetch Data /////
  //   const fetchData = async () => {
  //     const res = await fetch("http://localhost:5001/projects");
  //     const data = await res.json();
  //     //console.log(data.mockData[0].project_name);

  //     return data;
  //   };

  return (
    <section className="new-project">
      <h1>
        {!props.currentProject
          ? "new project"
          : `settings - ${props.currentProject?.project_name} `}
      </h1>
      <button className="btn_cancel btn_go_back" onClick={() => navigate(-1)}>
        Go back
      </button>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-cards-wrapper">
          <div className="card general_settings">
            <h2>general</h2>
            <label>
              Name
              <input
                className="settings_input"
                value={formData.name}
                name="project_name"
                placeholder={props.currentProject?.project_name}
                onChange={handleFormChange}
              />
            </label>
            <label>
              URL
              <input
                className="settings_input"
                value={formData.url}
                name="url"
                placeholder={props.currentProject?.project_url}
                onChange={handleFormChange}
              />
            </label>
            <label>
              AdWordsAccount
              <select
                value={formData.ad_words_account}
                onChange={handleFormChange}
                name="ad_words_account"
              >
                <option value="init-option" disabled>
                  Choose account
                </option>
                {data &&
                  data[0].ad_words_account.map((ad) => (
                    <option key={ad} value={ad}>
                      {ad}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Use two dimensional tagging
              <input
                type="checkbox"
                className="tagging-checkbox"
                name="twod_tagging"
                onChange={handleFormChange}
              />
            </label>
            <label>
              Language
              <select
                onChange={handleFormChange}
                value={formData.language}
                name="language"
              >
                <option value="init-option" disabled>
                  Choose language
                </option>
                {data &&
                  data[0].languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Location
              <select
                onChange={handleFormChange}
                value={formData.country}
                name="country"
              >
                <option value="init-option" disabled>
                  Choose location
                </option>
                {data &&
                  data[0].countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Locales
              <select
                onChange={handleFormChange}
                value={formData.locale}
                name="locale"
              >
                {data &&
                  data[0].locales.map((locale) => (
                    <option key={locale} value={locale}>
                      {locale}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Targeting device type
              <label className="radio-label">
                <input
                  type="radio"
                  name="device"
                  value="smartphone"
                  onChange={handleFormChange}
                />
                <span>Smartphone</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="device"
                  value="desktop"
                  onChange={handleFormChange}
                />
                <span>Desktop</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="device"
                  value="both"
                  onChange={handleFormChange}
                />
                <span>Both</span>
              </label>
            </label>
          </div>
          {/*These settings are not presented when creating new project in old project, but it makes sense to offer them here*/}

          <div className="card competitors_settings">
            <h2>competitors</h2>
            <div className="new-competitor">
              <label htmlFor="competitor-name">New Competitor</label>
              <input
                className="competitor-input settings_input"
                id="competitor-name"
                placeholder="Name"
                name="competitor_name"
                onChange={handleCompetitorChange}
                value={newCompetitor.name}
              />
              <input
                className="competitor-input settings_input"
                placeholder="URL"
                name="competitor_url"
                onChange={handleCompetitorChange}
                value={newCompetitor.url}
              />
            </div>
            <button
              type="button"
              className="btn_confirm btn_add_competitor"
              onClick={addCompetitor}
            >
              Add
            </button>
            <div className="competitors-list">
              <h3>All Competitors</h3>
              <div className="competitors-list-labels">
                <h4 className="competitor-label-name">project</h4>
                <h4 className="competitor-label-url">url</h4>
                <h4 className="competitor-label-delete">delete</h4>
              </div>
              <ul>
                {competitors &&
                  competitors.map((competitor) => {
                    return (
                      <li
                        key={competitor.competitor_name}
                        id={competitor.competitor_name}
                      >
                        <div className="competitor-list-name">
                          {competitor.competitor_name}
                        </div>
                        <div className="competitor-list-url">
                          {competitor.competitor_url}
                        </div>
                        <div className="competitor-list-delete">
                          <button
                            className="delete_btn change"
                            onMouseEnter={(e) => changeTextTagBtn(e)}
                            onMouseLeave={(e) => changeBackTagBtn(e)}
                            onClick={deleteCompetitor}
                          >
                            {" "}
                            X{" "}
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="form-button-wrapper">
          <button type="button" className="btn_cancel">
            Clear
          </button>
          <button type="submit" className="btn_confirm">
            Save
          </button>
        </div>
      </form>
      {urlPath.pathname !== "/newProject" && (
        <div className="card export">
          <h2>Export data</h2>
        </div>
      )}
    </section>
  );
};

export default NewProject;
// form-button submit-button
