const mysql = require('mysql');

var db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    res.send("form submitted");
}