const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const sql = require('../dbOperations');

//// get all groups AND tags from Project MYSQL ////
router.get("/:id", async (req, res) => {
  let projectId = req.params.id;
  //console.log("projectId", projectId);
  const groupResult = await sql.getAllWithParams("groups", "project_id", projectId);
  const tagResult = await sql.getAllWithParams("tags", "project_id", projectId);

  const combinedResult = groupResult.recordset.concat(tagResult.recordset);
  console.log(combinedResult);
  res.status(200).json(combinedResult);
});

/////  add new group  /////
router.post("/add", (req, res) => {
  let groupToAdd = req.body.newGroup;
  console.log(groupToAdd);

  const result = sql.addSingle("groups", ["group_title", "project_id"], [groupToAdd.group_title, groupToAdd.project_id]);  
  const lastId = sql.returnLastId();
  console.log("result: ", result);
  console.log("lastId: ", lastId);
  // req.app.locals.con.connect((err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   let sql = `INSERT INTO groupTable (group_title, project_id) VALUES ('${groupToAdd.group_title}', ${groupToAdd.project_id})`;
  //   console.log(sql);
  //   req.app.locals.con.query(sql, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     }

  //     //console.log("result:", result.insertId);
  //     let groupId = result.insertId;

  //     if (groupToAdd.tag_title) {
  //       let sql2 = `INSERT INTO tagTable (tag_title, group_id, project_id, tag_color) VALUES ('${groupToAdd.tag_title}', ${groupId}, ${groupToAdd.project_id}, '${groupToAdd.tag_color}' )`;
  //       console.log(sql2);
  //       req.app.locals.con.query(sql2, (err, tagResult) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //         //console.log("result", tagResult);
  //         let tagId = tagResult.insertId;

  //         res.status(200).json({
  //           message: "Successfully Registered",
  //           groupId: groupId,
  //           tagId: tagId,
  //         });
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: "Successfully Registered",
  //         groupId: groupId,
  //       });
  //     }
  //   });
  // });
});

///// delete group /////
router.delete("/delete/:id", (req, res) => {
  let groupId = req.params.id;
  console.log("groupId", groupId);

  req.app.locals.con.connect((err) => {
    if (err) {
      console.log(err);
    }

    let sql = `DELETE FROM groupTable WHERE group_id = '${groupId}'`;

    req.app.locals.con.query(sql, (err, delGroup) => {
      if (err) {
        console.log(err);
      }
      console.log(delGroup);

      res.status(200).json({
        message: "deleted group succes",
      });
    });
  });
});

module.exports = router;
