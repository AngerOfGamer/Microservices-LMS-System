const mysql = require("mysql2");
const config = require("./config");

const db = mysql.createConnection(config.db);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
    process.exit(1);
  }
  console.log("Connected to database!");
});

module.exports = db;
