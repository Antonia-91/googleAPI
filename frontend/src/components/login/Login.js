// npm install react-google-login (Antonia har installerat)

// READ THIS
// https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del

// Steps
// We need to create an application in the Google developer console. It provides clientId is used to identify your application for authentication details. Follow the below steps to get the client ID.
// Go to the Credentials page. ( if you are new, then create a project and follow these steps)
// Click Create credentials > OAuth client ID.
// Select the Web application type.
// Name your OAuth 2.0 client and click Create
// Make sure you provided your domain and redirect URL. So that Google identifies the origin domain to which it can provide authentication.

// Create a Login component that acts as a login button.

import React from "react";
import { GoogleLogin } from "react-google-login";
import { useState, useContext } from 'react';
import { MyContext } from "../../contex";


const clientId ="855752768317-qr0lt7jle0flcta9pnui8blcdacsetnk.apps.googleusercontent.com";
//"855752768317-qr0lt7jle0flcta9pnui8blcdacsetnk.apps.googleusercontent.com";

const Login = () => {
   
  // hämtar globalt state från context.js
  const {user, setUser} = useContext(MyContext);


  // on fail login
  const onFail = (res) => {
    console.log("Login failed... res:", res);
  };

  // on success login, 
  const onSuccess =  async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    // sätt till localstorage, för att i våran cotex.js hämta localstorage och skapa en global variabel
    localStorage.setItem('loginData', JSON.stringify(data));
    setUser(data);
    console.log(user)
  };


  ////////-------- Returning followong Elements ---------///////////
  return (
    <section className="main">
      <div className="login_wrapper">
        <h1>Nordic Morning dev</h1>
              <GoogleLogin
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={onSuccess}
                onFailure={onFail}
                cookiePolicy={"single_host_origin"}
              />
        
      </div>
    </section>
  );
};

export default Login;



