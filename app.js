const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');
const hbs = require('hbs');
const handleBars = require('express-handlebars');
const cookieParser = require('cookie-parser');

require('dotenv').config({ path: './.env'})
const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect(function(err) {
    if (err) throw err;
    else console.log('Mysql connected');
});

const hbsJson = handleBars.create({
    helpers: {
        json: function (context) {
            return JSON.stringify(context);
        },
    },
});
app.engine('hbs', hbsJson.engine);

// app.use(cookieParser());
app.use(cookieParser());
app.use(express.urlencoded( {extended:false }));

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, './public')));

const images = './images';
app.locals.imageBasePath = images;

const partialsPath = path.join(__dirname, 'views', 'partials');
hbs.registerPartials(partialsPath);

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
    console.log(`http://localhost:${port}`);
});
