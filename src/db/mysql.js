
const mysql = require("mysql"); 
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "javascript"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
module.exports = con