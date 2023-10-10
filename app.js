var express = require('express');
var mysql = require('mysql');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './.env'})

var db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect(function(err) {
    if (err) throw err;
    else console.log('Mysql connected');
})

app.get('/', (req, res) => {
    res.send('<h1>MML LITE</h1>');
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
});