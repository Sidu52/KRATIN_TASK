require('dotenv').config();
const mysql = require('mysql2');

//Create a MySql connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "healthapk",
})

//Connect to the database
db.connect((error) => {
    if (error) { console.error('Error connecting to the database:', error); return; }
    console.log("Connected to the database");
})

module.exports = db;