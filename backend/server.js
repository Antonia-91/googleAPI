const express = require("express");
//const router = express.Router(); /// NY KOD
const dotenv = require("dotenv");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const bodyParser = require("body-parser");
// const mysql = require("mysql2");
// const sql = require('mssql');
const sql = require('./dbOperations');


const request = require('request');
const cheerio = require('cheerio');

// var mockData = require("./mockdata");
// var groups = require("./groups");
/// import Routes
const projectRouter = require("./routes/Project.js"); /// NY KOD
const groupRouter = require("./routes/Groups.js");
const tagRouter = require("./routes/Tags.js");
const keywordRouter = require("./routes/Keywords.js");
const searchTermRouter = require("./routes/searchTerms.js");

/// Enables CORS
const cors = require("cors");
const dbOperations = require("./dbOperations");

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//app.use(router);
/// use routes
app.use("/projects", projectRouter); /// NY KOD
app.use("/groups", groupRouter);
app.use("/tag", tagRouter);
app.use("/projectKeyords", keywordRouter);
app.use("/searchTerms", searchTermRouter);

// const config = {
//   user: "petter.sjunnestrand@nordicmorning.com",
//   password: "Intern12Ship%",
//   server: "nmseodb01.database.windows.net",
//   database: "nmseo-tools",
//   options: {
//     trustedconnection: true,
//     encrypt: true, // for azure
//     trustServerCertificate: true
//   }
// }
// const config = {
//   server: 'nmseodb01.database.windows.net',
//   database: 'nmseo-tools',
//   authentication: {
//       type: "azure-active-directory-password",
//       options: {
//           userName: "petter.sjunnestrand@nordicmorning.com",
//           password: "Intern12Ship%",
//           }
//       }
//   }
// const sqlConfig = {
//   user: "petter.sjunnestrand",
//   password: "KSk6K82ftxFUvR%j",
//   database: "nmseo-tools",
//   server: 'nmseodb01.database.windows.net',
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   },
//   options: {
//     encrypt: true, // for azure
//     trustServerCertificate: true // change to true for local dev / self-signed certs
//   }
// }


// app.get("/", async (req, res) => {
//   const projects = await sql.getProjects();
//   console.log(projects);
//   console.log("hej!");
// })
/// connect to database
// app.locals.con = mysql.createConnection({
//   host: "localhost",
//   port: "8889",
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

/////// login response //////
const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

///// get user /////
app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});


// request = request.defaults({jar: true});

/// running scraper
app.post("/runningscraper", (req, res) => {
  let x = req.body.project_name;
  console.log(x);

  //FOR VPN AND PROXY
  //add vpn on your computers by doing the following:
  //Username: edita\"firstname.lastname" (the same as your email address without @nordicmorning.com)
  //Password: ”the same as you received in text message when you started"
  //MAC (Built-in)
  //Server address: vpn.scurulum.com
  //Shared secret: 3Ettbvxc!vxc3gq2
  //Send all traffic over VPN connection = true
  //and...
  //take all the 40 proxies from the old file and loop through them

//searchword for ranking. This can be replaced by searchterm/s coming from the frontend
let searchTerm = "arla";

//start says where the result should start from and num says how many results per page should be shown, in total 100 results, max 10 per page. This needs to be looped.
let start = 0;
let num = 10;

//using https for the req
const https = require("https");

//created a google engine in order to scrape the result, gives me max 100 results. 
//<script async src="https://cse.google.com/cse.js?cx=7428923684e06f722"></script>
//<div class="gcse-search"></div>
//we are only interested in cx=....
//and then there is the api key generetad according to this link: https://blog.dotnetframework.org/2021/06/14/using-the-google-search-api-in-c. The API key is AIzaSyDtMYWNJh6JTUf0uj5uOianZf_dJia8TFk
//The engine should have "*.se" if you want to create a new engine
let apiUrl = "https://customsearch.googleapis.com/customsearch/v1?cx=7428923684e06f722&key=AIzaSyDtMYWNJh6JTUf0uj5uOianZf_dJia8TFk&q=" 
  + searchTerm + "&start=" + start + "&num=" + num;

//used cheerio to load the page's body. It's a common tool for scraping
  request(apiUrl, function(error, response, body){

    //chose the body and load it with cheerio
    let cheLoad = cheerio.load(body)
    //there were three options from the body, but we are interested in html
    cheLoad("html").each(function(){
      let link = cheLoad(this);

      //convert it into reading text
      let text = link.text();

      console.log("cheerio arla",text);
    })
  })

  //timer for how long the journey for ranking should take
  const timer = () => {
    let message = "Project " + x + " has completed";
    console.log(message);
    res.json({ message: message });
  };

  // 1 minute running
  setTimeout(timer, 5000);
});

app.listen(process.env.PORT || 5001, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5001}`
  );
});

app.get("/error", (req, res) => {
  throw new Error("BROKEN");
});

//module.exports = app;
