const sql = require('mssql');
const config = require('./dbconfig');

// The connection part is kind of iffy at the moment. SHould be reviewed.
// Tested ok!
const getAllNoParams = async () => {
    try{
        let pool = await sql.connect(config);
        let projects = await pool.request().query("SELECT * FROM projects");
        return projects
      } catch(error) {
        console.log(error);
      }
}

// Tested ok!
const getAllWithParams = async (table, row, id) => {
  try{
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM ${table} WHERE ${row} = ${id}`);
    return result;
  } catch(error){
    console.log(error);
  }
}

const getAllInArray = async (table, row, array) => {
  try{
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM ${table} where ${row} IN (${array})`);
    return result;
  } catch(error) {
    console.log(error);
  }
}
// Tested ok!
const addFromArray = async (table, title, url = null, values) => {
  try{
    // const pool = await sql.connect(config);
    
    const insertTable = new sql.Table(table) ;
    insertTable.create = true;
    insertTable.columns.add(title, sql.NVarChar(50), {nullable: false});
    insertTable.columns.add('project_id', sql.Int, {nullable: false});
    if(url){
      insertTable.columns.add(url, sql.NVarChar(128), {nullable: true});
      values.forEach(arr => insertTable.rows.add(arr[0], arr[1], arr[2]));
    } else {
      values.forEach(arr => insertTable.rows.add(arr[0], arr[1]));
    }

    console.log(insertTable)
    
    const request = new sql.Request()
    return request.bulk(insertTable, (err, result) => {
      if(err) throw err;
      console.log(result);
      return insertTable;
    })

  } catch(error){
    console.log(error);
  }
}
// Tested ok!
const deleteFromTable = async (table, row, id) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool.request().query(`DELETE FROM ${table} WHERE ${row} = ${id}`);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}

// Tested ok!
const addProject = async (values, competitors = null) => {
  const sqlQuery = `INSERT INTO projects(project_name, project_country, project_language, project_url, project_ad_words, project_tagging, project_locale, project_device) VALUES('${values.project_name}','${values.country}','${values.language}','${values.url}','${values.ad_words_account}',${values.twod_tagging},'${values.locale}','${values.device}')`;

  console.log(sqlQuery);
  const pool = await sql.connect(config);
  const result = await pool.request().query(sqlQuery);
  if(competitors) {
    return await addFromArray("competitors", "competitor_name", "competitor_url", competitors);
  }
  return result;
}

// Tested ok!
const addSingle = async (table, columns, values) => {
  const sqlQuery = `INSERT INTO ${table}(${columns.map(column => column)}) VALUES (${values.map(value => typeof value === "string" ? `'${value}'` : value)})`;
  console.log(sqlQuery);
  const pool = await sql.connect(config);
  const result = await pool.request().query(sqlQuery);
  return result;
}

// Tested ok!
const deleteTag = async (paramId, paramProjectId) => {
  const tagTableSql = `DELETE FROM tags WHERE tag_id = ${paramId}`;
  const pool = await sql.connect(config);
  const deleteResult = await pool.request().query(tagTableSql);
  if(deleteResult){
    const selectSql = `SELECT * FROM searchterms WHERE project_id = ${paramProjectId}`;
    const selectResult = await pool.request().query(selectSql);
    console.log(selectResult);
    if(selectResult){
      // Tag_ids string is made into array, target value removed, array remade into string and sent back into db.
      for(let i = 0; i < selectResult.recordset.length; i++){
        // Should this be done in the if-clause?
        const searchTermId = selectResult.recordset[i].searchterm_id;
        const newTagIdArray = selectResult.recordset[i].tag_ids.split(",");
        console.log(newTagIdArray);
        const index = newTagIdArray.indexOf(paramId);
        // const index = newTagIdArray.indexOf("5");
        console.log(index);
        if(index > -1) {
          newTagIdArray.splice(index, 1);
          console.log(newTagIdArray);
          const newTagIdString = newTagIdArray.join();
          console.log(newTagIdString);

          const updatedTags = updateTagIds(newTagIdString, searchTermId, pool);
        //   const updateSql = `UPDATE searchterms SET tag_ids = '${newTagIdString}' WHERE searchterm_id = ${searchTermId}`;
        //   console.log(updateSql);
        //   const updateResult = await pool.request().query(updateSql);
        //   console.log(updateResult);
          console.log(updatedTags);
        }
      }
    }
  }
  return "Tag deleted successfully";
}
// This should be incorporated into updateTable below
const updateTagIds = async (tagIds, searchTermId, pool = null) => {
  const updateSql = `UPDATE searchterms SET tag_ids = '${tagIds}' WHERE searchterm_id = ${searchTermId}`;
  console.log(updateSql);
  let updateResult;
  if(pool === null){
    const newPool = await sql.connect(config);
    updateResult = await newPool.request().query(updateSql);
  } else {
    updateResult = await pool.request().query(updateSql);
  }
  return updateResult;
}
const updateBlacklist = async (id, updateType) => {
  let updateQuery;
  if(updateType === "remove"){
    updateQuery = `UPDATE searchterms SET black_list = black_list ^ 1 WHERE searchterm_id = ${id}`;
  } else {
    updateQuery = `UPDATE searchterms SET black_list = black_list ^ 1 WHERE searchterm_id in (${id})`;
  }
  const pool = await sql.connect(config);
  const result = await pool.request().query(updateQuery);
  return result;
}
const updateTable = async (table, setColumn, setValue, whereColumn, whereValue) => {
  const updateQuery = `UPDATE ${table} SET ${setColumn} = '${setValue}' WHERE ${whereColumn} = ${whereValue} `;
  const pool = await sql.connect(config);
  const updateResult = await pool.request().query(updateQuery);
  return updateResult;
}
const returnLastId = async () => {
  const query = `SELECT SCOPRE_IDENTITY()`;
  const pool = await sql.connect(config);
  const result = await pool.request().query(query);
  return result;
}
module.exports = {
    getAllNoParams: getAllNoParams,
    getAllWithParams: getAllWithParams,
    getAllInArray: getAllInArray,
    addFromArray: addFromArray,
    deleteFromTable: deleteFromTable,
    addProject: addProject,
    addSingle: addSingle,
    deleteTag: deleteTag,
    updateTagIds: updateTagIds,
    updateBlacklist: updateBlacklist,
    updateTable: updateTable,
    returnLastId: returnLastId,
}

