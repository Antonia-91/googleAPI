const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const sql = require('../dbOperations');

///// Get project Keywords - discovery.js /////
router.get("/:id", async (req, res) => {
    let projectId = req.params.id;
    //console.log("projectId from discovery.js", projectId);
    // req.app.locals.con.connect((err) => {
    //   if (err) {
    //     console.log(err);
    //   }
  
    //   let sql = `SELECT * FROM keywordTable WHERE project_id = '${projectId}'`;
    //   req.app.locals.con.query(sql, (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     // console.log("keyword result", result);
  
    //     res.status(200).json(result);
    //   });
    // });
    const result = await sql.getAllWithParams("keywords", "project_id", projectId);
    if(result){
      console.log(result);
      res.status(200).json(result.recordset);
    }
    // Needs testing!
  });
  
  ///// delete keyword - discoery.js /////
  router.delete("/delete/:id", async (req, res) => {
    let keywordId = req.params.id;
    const result = await sql.deleteFromTable("keywords", "keyword_id", keywordId);
    if(result) {
      console.log(result)
      res.status(200).json({message: "delete keyword success"});
    }
    // console.log(keywordId);
  
    // req.app.locals.con.connect((err) => {
    //   if (err) {
    //     console.log(err);
    //   }
  
    //   let sql = `DELETE FROM keywordTable WHERE keyword_id = '${keywordId}'`;
    //   req.app.locals.con.query(sql, (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     }
  
    //     res.status(200).json({
    //       message: "delete keyword success",
    //     });
    //   });
    // });
  });
  
  ///// add keywords /////
  router.post("/add", async (req, res) => {
    const values = req.body;
    // Fix this when keyword generation in front has been updated to remove duplicates
    const result = await sql.addFromArray("keywords", "keyword_title", null, values);
    if(result){
      console.log(result);
      res.status(200).json({message: "ok", result: result.recordset})
    } else {
      res.status(500).json({message: "Something went wrong"});
    }
    // console.log(req.body);
  
    // req.app.locals.con.connect((err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   let sql = `INSERT INTO keywordTable ( keyword_title, project_id) VALUES ? `;
  
    //   req.app.locals.con.query(sql, [req.body], (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(result);
        
  
    //     res.json({ message: "ok", result: result });
    //   });
    // });
  });

  module.exports = router;