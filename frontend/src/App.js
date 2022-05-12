import "./css/app.css";
import { GoogleLogin } from "react-google-login";
import { useState, useContext } from "react";
import { MyContext } from "./contex";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"



import Nav from "./components/nav/Nav";
import Login from "./components/login/Login";
import LandingPage from "./components/landingPage/LandingPage";
import AllProjects from "./components/allProjects/AllProjects";
import Discovery from "./components/currentProject/Discovery/Discovery";
import NewProject from "./components/NewProject/NewProject";
import Tagging from "./components/currentProject/Tagging/Tagging";
import Summary from "./components/currentProject/Summary/Summary";
import CurrentProject from "./components/currentProject/CurrentProject";

//const clientId = "113220630187-g9i5apbtc6kch1ne5e9tnjatramoku0r.apps.googleusercontent.com";
  // AntoniaKey: "113220630187-g9i5apbtc6kch1ne5e9tnjatramoku0r.apps.googleusercontent.com";
  // NmKey: "855752768317-qr0lt7jle0flcta9pnui8blcdacsetnk.apps.googleusercontent.com"

function App() {
  const { user, setUser } = useContext(MyContext);
  const [currentProjectId, setCurrentProjectId] = useState();


  return (
    <div className="App">
         <BrowserRouter>
         
         {user && (<Nav/>)}
           <Routes>
      {!user && (
        <>
          <Route path="/" element={<Login/>}/>
        </>
      )}
      
          {user && (
              <>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/allProjects" element={  <AllProjects/>} /> 
                <Route path="/newProject" element={ <NewProject/>}/>
                <Route path="/project/:projectId/*" element={<CurrentProject/>}/>
                <Route path="/project" element={<Navigate to="/allProjects" replace />} />
              </>
          )}
           
       
       
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
