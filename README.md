# Introduction 
This project is for the SEO team and the tools for the Market Insights Analysis tool as a starting point plan is to also migrate DGT tool into this project in the future.

# Getting Started
Project is deiided into Frontend and Backend in each folder you will find separeate readme files to get you started


# Setting up project locally.
Frontend and backend need to be set up independently.

1. Download and install nodejs from [the nodejs website](https://nodejs.org/en/download/)
2. Check if npm is installed by running `npm -v`
3. If npm is not installed, run `npm i npm` (with global flag `-g` if you want it globally).

# Set up frontend locally
1. cd into frontend folder and run `npm i` to install all dependencies.
2. run `npm start` to start project in browser. If the browser does not open automatically, do it manually and go to `localhost:3000`

# Set up backend locally
1. cd into backend folder and run `npm i` to install all dependencies.
2. The backend connects to a local mysql database. If you want to use the database connection, make sure a local databse instance is in place. Create a `.env` file in the root directory and include connection info to the database in the file. The variables `DB_USERNAME`, `DB_PASSWORD` and `DB_DATABASE` in the .env file need to be assigned appropriate values with the following syntax: `DB_USERNAME="username"`. The connection to the database is made in the `server.js` file on lines 45 through 51. Make sure the port matches the one the database is running on.
3. To run the backend, run `npm start` in the console.
4. If CORS problems occur, one might need to add further options to the cors middleware as per [the official documentation](https://www.npmjs.com/package/cors).