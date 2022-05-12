//In a typical React application, data is passed top-down (parent to child) via props, 
// but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme)
//  that are required by many components within an application.
//   Context provides a way to share values like these between 
//   components without having to explicitly pass a prop through every level of the tree.


import { createContext, useCallback, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";


export const MyContext = createContext();

export const AppContext = ({ children }) => {

// hämta från LS. skapa en variabel och ett globalt state (user)
const logedinUser =  localStorage.getItem("loginData")
? JSON.parse(localStorage.getItem("loginData"))
: null;

const [user, setUser] = useState("logedinUser");
// const [user, setUser] = useState(logedinUser);
const [ calledProject, setCalledProject ] = useState(null)
const [currentProject, setCurrentProject] = useState();


///// set calledProject to clicked projectID from URL //////
const setProjectId = (id) => {
  //console.log(id)
  // fecthId(id)
  setCurrentProject(id);
}

///// Fetch SingelProject /////
        const fecthId =  async (id) => {
       // console.log(id)
        const res = await fetch(`http://localhost:5001/projects/${id}`);
        const data = await res.json();
        //console.log("data", data[0])
        await setCalledProject(data[0]);
        console.log("called Project!");
      }
      
//console.log(calledProject)


  return (
    <MyContext.Provider
      value={{
        user, setUser,
        setProjectId,
        calledProject,
        currentProject,
        
       
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
