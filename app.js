const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');
const hbs = require('hbs');
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

// app.use(cookieParser());
app.use(cookieParser());
app.use(express.urlencoded( {extended:false }));


const location = path.join(__dirname, './public');
app.use(express.static(location));
app.set('view engine', 'hbs');

const partialsPath = path.join(__dirname, './views/partials/');
hbs.registerPartials(partialsPath);

const imgPath = path.join(__dirname, './views/partials/img');
hbs.registerPartials(imgPath);

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
    console.log(`http://localhost:${port}`);
});

/*
app.post('/createUser', async (req, res) => {
    const { email, passwd, phone, batch, urole } = req.body;
    const hashedPassword = await bcrypt.hash(passwd, 10);

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "select * from Users WHERE email = ?";
        const search_query = mysql.format(sqlSearch,[email]);

        const sqlInsert = "insert into Users values (0,?,?,?,?,?)";
        const insert_query = mysql.format(sqlInsert,[email, hashedPassword, phone, batch, urole]);

        await connection.query (search_query, async (err, result) => {
            if (err) throw err;
            console.log("-----> Search results");
            console.log(result.length);

            if (result.length != 0) {
                connection.release();
                console.log("-----> user already exists");
                res.sendStatus(409);
            } else {
                await connection.query (insert_query, (err, result) => {
                    connection.release();

                    if (err) throw err;
                    console.log("-----> created new user");
                    console.log(result.insertId);
                    res.sendStatus(201);
                })
            }
        });
    });
});

// https://www.npmjs.com/package/hbs
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);


app.post('/login', (req, res) => {
    const { email, passwd, phone, batch, urole } = req.body;
    db.getConnection (async (err, connection) => {
        if (err) throw err;
        const sqlSearch = 'select * from Users where email = ?'
        const search_query = mysql.format(sqlSearch, [email]);

        await connection.query (search_query, async (err, result) => {
            connection.release();

            if (err) throw err;
            if (result.length == 0) {
                console.log("-----> User does not exist");
                res.sendStatus(404);
            } else {
                const hashedPassword = result[0].passwd;
                if (await bcrypt.compare(passwd, hashedPassword)) {
                    console.log("-----> login success");
                    res.send(`${email} is logged in`);
                } else {
                    console.log('incorrect password');
                    res.send('incorrect password')
                }
            }
        });
    });
});
*/
