var express = require('express');
var mysql = require('mysql');
var path = require('path');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './.env'})

var db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const publicDir = path.join(__dirname, './style');
app.use(express.static(publicDir));

// https://www.npmjs.com/package/hbs
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);


db.connect(function(err) {
    if (err) throw err;
    else console.log('Mysql connected');
})

app.get('/', (req, res) => {
    // res.send('<h1>MML LITE</h1>');
    res.render("index_test");
});

app.get('/register', (req, res) => {
    res.render("register_test");
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
});