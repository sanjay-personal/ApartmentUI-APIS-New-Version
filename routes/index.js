var express = require('express');
var router = express.Router();
// var con = require('.././routes/dbconnection/db') 
var mongoUtil = require('.././routes/dbconnection/db') 



/* GET home page. */
router.get('/', async function(req, res, next) {
  // console.log("database22",await con.dbConnection.collection("sign_up").find({}).toArray())
  // console.log("database22",await con.dbs.collection("sign_up").find({}).toArray())
  console.log("database22",await  mongoUtil.getDb().collection("sign_up").find({}).toArray())

  // console.log("database22",await con.db())


  res.render('index', { title: 'Express' });
});

module.exports = router;
