const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const sql = require('../dbOperations');

////// get all projects //////
router.get("/", async (req, res) => {
  // req.app.locals.con.connect((err) => {
  //   //throw new Error('Oh no! Error!')
  //   if (err) {
  //     console.log(err);
  //   }

  //   let sql = `SELECT * FROM projectTable`;

  //   req.app.locals.con.query(sql, (error, result) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     console.log("db results: ", result);
  //     res.json(result);
  //   });
  // });
  const results = await sql.getAllNoParams();
  console.log(results);
  if(results) {
    res.json(results.recordset);
  } else {
    res.json("DB error")
  }
});

/////  get project by id /////
router.get("/:id", async (req, res) => {
  let projectId = req.params.id;
  // //console.log(projectId);

  // req.app.locals.con.connect((err) => {
  //   if (err) {
  //     console.log(err);
  //   }

  //   let sql = `SELECT * FROM projectTable WHERE project_id = '${req.params.id}'`;
  //   //let tagGroupSql = `SELECT * FROM  tagGroup WHERE id = '${req.params.id}'`;

  //   req.app.locals.con.query(sql, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     }

  //     // console.log("result:", result);
  //     res.json(result);
  //   });
  // });
  const result = await sql.getAllWithParams("projects", "project_id", projectId);
  res.status(200).json(result.recordset)
});

///// post new project /////
router.post("/add", async (req, res) => {
  console.log(req.body);
  const formData = req.body.formData;
  let competitorData = req.body.competitorData;
  let result;
  if (competitorData.length !== 0) {
    //This needs to be taken from db when updating.
    const competitorDataArray = [];
    let newCompetitorDataArray = [];

    //Converts the competitorData object array into an array of arrays. This is needed for the SQL querry.
    for (i = 0; i < competitorData.length; i++) {
      newCompetitorDataArray = [
        ...newCompetitorDataArray,
        competitorDataArray.concat(Object.values(competitorData[i])),
      ];
    }
    console.log(formData);
    console.log(newCompetitorDataArray);
    result = await sql.addProject(formData, newCompetitorDataArray)
  } else {
    result = await sql.addProject(formData);
  }
  // req.app.locals.con
  //   .connect((err) => {
  //     if (err) {
  //       console.log(err);
  //     }

  //     const sql = `INSERT INTO projectTable(project_name, project_country, project_language, project_url, project_ad_words, project_tagging, project_locale, project_device) VALUES ("${formData.project_name}","${formData.country}","${formData.language}","${formData.url}","${formData.ad_words_account}",${formData.twod_tagging},"${formData.locale}","${formData.device}")`;

  //     req.app.locals.con.query(sql, (error, result) => {
  //       if (error) {
  //         console.log(error);
  //         // throw new Error(error);
  //       }
  //       console.log("db results: ", result.insertId);

  //       // })
  //       // .then(result => {

  //       // })
  //       if (competitorData.length !== 0) {
  //         //This needs to be taken from db when updating.
  //         const competitorDataArray = [];
  //         let newCompetitorDataArray = [];

  //         //Converts the competitorData object array into an array of arrays. This is needed for the SQL querry.
  //         for (i = 0; i < competitorData.length; i++) {
  //           competitorData[i].project_id = result.insertId;
  //           newCompetitorDataArray = [
  //             ...newCompetitorDataArray,
  //             competitorDataArray.concat(Object.values(competitorData[i])),
  //           ];
  //         }

  //         const sql2 = `INSERT INTO competitors(competitor_name, competitor_url, project_id) VALUES ?`;

  //         req.app.locals.con.query(sql2, [newCompetitorDataArray], (e, re) => {
  //           if (e) {
  //             console.log(e);
  //           }
  //           req.app.locals.con.end();
  //         });
  //       }
  //     });
  //   })
  //   .catch();
  res.json("ok!");
});

///// save search terms ////
router.post("/:id/searchTerms", async (req, res) => {
  let projectId = req.params.id;
  let body = req.body;
  console.log(body);
  const dataArray = [];
  let newDataArray = [];

  //Converts the competitorData object array into an array of arrays. This is needed for the SQL querry.
  for (i = 0; i < body.length; i++) {
    // body[i].keyword_title = result.insertId;
    newDataArray = [
      ...newDataArray,
      dataArray.concat(parseInt(projectId), body[i].keyword_title),
    ];
  }
  console.log(newDataArray);
  const result = await addFromArray("searchterms", "searchterm_title", null, newDataArray);
  // req.app.locals.con.connect((err) => {
  //   if(err) {
  //     console.log(err);
  //   }

  //   const sql = `INSERT INTO searchterms(project_id, searchterm_title) VALUES ?`;
  //   req.app.locals.con.query(sql, [newDataArray], (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(result);
  //     res.json({ok: "ok"})
  //   })
  // })





})
module.exports = router;
