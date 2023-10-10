var express = require('express');
var mysql = require('mysql');
const app = express();

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Naing15!',
    database: 'canteen'
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