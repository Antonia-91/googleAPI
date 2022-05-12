# MIA NEW DEV TOOL

## frontend:

* npx create-react-app react-google-login
* npm install react-google-login
* edit App.js
* create h1 for app name.
* define loginData state hook
* check loginData and render content
* if loginData is null render GoogleLogin component
* if loginData isn't null render you are logged in message.
* implement handleLogout
* implement handleFailure
* implement handleLogin

## google cloud platform:

* login to google,
* go to https://console.cloud.google.com
* create a project
* go to api credential
* accept consent screen
* craete oauth client id
* craete .env file and save it as REACT_APP_GOOGLE_CLIENT_ID

## backend:

* create server.js file
* npm install express dotenv google-auth-library
* config dotenv
* create OAuth2Client client
* create express server
* use express.json()
* define app.post('/api/google-login', ...
* define app.listen


# To interact with databse.
The following functions are used to interact with the database:
1. getAllNoParams
2. getAllWithParams
3. addFromArray
4. deleteFromTable
5.

They are general functions that take in appropriate parameters. Check the dbOperations.js file to see what parameters are required.
The above functions should cover most use cases. If not, create a new one.