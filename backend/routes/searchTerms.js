const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const sql = require('../dbOperations');

var exec = require("child_process").exec;
router.get('/generate', function(req, res){exec("php test.php", function (error, stdout, stderr) {res.send(stdout);});});

///// Get project Keywords - discovery.js /////
router.get("/:id", async (req, res) => {
  let projectId = req.params.id;

  // Tested ok!
  const results = await sql.getAllWithParams("searchterms", "project_id", projectId);
  if(results){
    console.log(results);
    res.status(200).json(results.recordset);
  }
});

///// add tags to searchterms /////
router.post("/tags/add", async (req, res) => {
  console.log("url: ", req.url);
  console.log(req.body);
  const searchTermIds = req.body[0];
  const tagId = req.body[1][0];
  const groupId = req.body[1][1];
  let newTagArray = [];

  const updateSearchTermTags = (tags, searchTerms) => {
  }

  // Gets all chosen searchterms.
  const searchTermsResult = await sql.getAllInArray("searchterms", "searchterm_id", searchTermIds);
  console.log(searchTermsResult);
  if(searchTermsResult){
    const searchTermsDb = [...searchTermsResult.recordset];

    //Gets all tags within the same group as the selected tag.
    const tagsResult = await sql.getAllWithParams("tags", "group_id", groupId);
    console.log(tagsResult);
    const tagResultDb = [...tagsResult.recordset];
    let newTagIds;

    // Loop through ids of search terms from front
    for(let i = 0; i < searchTermIds.length; i++){ //Shouldn't the search terms from the db be looped instead?
        // If the db search term does not include any tag ids, we can just add the tag id to the search term.
        if(searchTermsDb[i].tag_ids === ''){
          newTagIds = `${tagId}`;
          //The following two lines should be moved to updateSearchTermTags.
          newTagArray.push({ newTags: newTagIds, searchTermAffected: searchTermIds[i] });
          const updatedTags = await sql.updateTagIds(newTagIds, searchTermIds[i]);
          console.log(updatedTags);
          continue;
        }
        let dbTagIds = searchTermsDb[i].tag_ids.split(",").map(Number);
        // If the tag id is already present in the search term object, we can skip it.
        if (dbTagIds.includes(tagId)) {
          console.log("no change needed");
          continue;
        }
        let removeTag;
        for (let j = 0; j < tagResultDb.length; j++) {
          // If the tag ids of a searchterm includes a tag id within the same group as the one being sent from the front, we need to remove the one currently in the search term tag ids array.
          // Remember: each searchterm may only be tagged with one tag per group.
          if (dbTagIds.includes(tagResultDb[j].tag_id)) {
            console.log("same group id!: ", tagResultDb[j].tag_id, dbTagIds);
            removeTag = tagResultDb[j].tag_id;
          } 
        }
        if (removeTag) {
          // Removes tag from search term's tag id array.
          const index = dbTagIds.indexOf(removeTag);
          if (index > -1) {
            dbTagIds.splice(index, 1);
          }
        }
        // If all above checks succeeds, we can finally add the tag to the search term.
        dbTagIds.push(tagId);
        newTagIds = dbTagIds.join();
        newTagArray.push({ newTags: newTagIds, searchTermAffected: searchTermIds[i] });
        const updatedTags = await sql.updateTagIds(newTagIds, searchTermIds[i]);
        console.log(updatedTags);
    }
    res.status(200).json(newTagArray);
    //Responses for when no change is made should also be added.
  }
});
// The two blak list routes should be combined into one. The current design of the front makes it somewhat cumbersome.
router.post("/addToBlacklist", async (req, res) => {
  const searchterms = req.body;
  console.log(searchterms);

  const result = await sql.updateBlacklist(searchterms, "add");
  console.log(result);
  if(result){
    res.status(200).json(result.recordset);
  }
});

///// remove searchterms from Blacklist /////
router.post("/removeFromBlacklist", async (req, res) => {
  const searchterm = req.body.searchTermId;
  console.log(searchterm);
  const result = await sql.updateBlacklist(searchterm, "remove");
  console.log(result);
  if(result){
    res.status(200).json(result.recordset);
  }
});

///// remove tags from searchterms /////
//This route needs a different uri, "update is too vague"
router.post("/update", async (req, res) => {
  console.log(req.body);

  let tagId = req.body.tagId;
  let searchTermId = req.body.searchterm_id;
  console.log(searchTermId);

  const result = await sql.getAllWithParams("searchterms", "searchterm_id", searchTermId);
  console.log(result);
  let tag_ids = result.recordset[0].tag_ids;

  let tagIdArray = tag_ids.split(",").map(Number);
  const index = tagIdArray.indexOf(tagId);
  if (index > -1) {
    tagIdArray.splice(index, 1);
  }
  
  const newTagIds = tagIdArray.join();
  console.log("newtags: ",newTagIds);
  const updateResult = await sql.updateTable("searchterms", "tag_ids", newTagIds, "searchterm_id", searchTermId);
  console.log(updateResult);
  res.status(200).json({
    message: "update succes",
    newTag_ids: newTagIds,
    searchTermId: searchTermId,
  });
});



module.exports = router;
