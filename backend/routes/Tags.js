const express = require("express");
const router = express.Router();
const cors = require("cors");
const sql = require('../dbOperations');
router.use(cors());

///// delete tag /////
router.delete("/delete/:id/:projectId", async (req, res) => {
  let paramId = req.params.id;
  let paramProjectId = req.params.projectId;
  console.log(paramProjectId);
  console.log(paramId);
  const result = await sql.deleteTag(paramId, paramProjectId);
  console.log(result);
  res.status(200).json(result);
  // req.app.locals.con.connect((err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   let sql = `DELETE FROM tagTable WHERE tag_id = '${paramId}'`;

  //   req.app.locals.con.query(sql, (err, delTag) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(delTag);

  //     let sql2 = `SELECT * FROM searchtermstable WHERE project_id = '${paramProjectId}'`;

  //     // Removes the tag ID from tags_id string for every search term that has it. 
  //     req.app.locals.con.query(sql2, (error, result) => {
  //       if (error) {
  //         console.log(error);
  //       }
  //       for(let i = 0; i < result.length; i++){
  //         if(result[i].tag_ids.indexOf(paramId.toString()) > -1){
  //           const searchTermId = result[i].searchterm_id;
  //           const newTagIdArray = result[i].tag_ids.replace(`,${paramId.toString()}`, "");
  //           console.log(newTagIdArray);

  //           let sql3 = `UPDATE searchtermstable SET tag_ids = "${newTagIdArray}" WHERE searchterm_id = ${searchTermId}`;

  //           req.app.locals.con.query(sql3, (err, response) => {
  //             if(err){
  //               console.log(err)
  //             }
  //             console.log(response);
  //           })
  //         }
  //       }
  //     });

  //     res.status(200).json({
  //       message: "delete tag succes",
  //     });
  //   });
  // });
});

/////  add tag to group //////
router.post("/add", async (req, res) => {
  let body = req.body;
  console.log(body);
  const results = await sql.addSingle("tags", ["project_id", "group_id", "tag_title", "tag_color"], [body.project_id, body.group_id, body.tag_title, body.tag_color]);
  if(results){
    console.log(results)
    res.json(results.recordset);
  }
  // req.app.locals.con.connect((err) => {
  //   if (err) {
  //     console.log(err);
  //   }

  //   let sql = `INSERT INTO tagTable (project_id, group_id, tag_title, tag_color) VALUES (${body.project_id}, ${body.group_id}, '${body.tag_title}' ,'${body.tag_color} ')`;
    
  //   console.log(sql);
  //   req.app.locals.con.query(sql, (err, addResult) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(addResult);
  //     res.status(200).json({
  //       message: "ok",
  //       tagId: addResult.insertId,
  //     });
  //   });
  // });
});

module.exports = router;
