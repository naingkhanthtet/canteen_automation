const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const express = require("express");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {msg: 'please enter correct email & password'});
        }

        db.query('select * from users where email=?', [email], async (err, result) => {
            console.log(result);
            if (result.length<=0) {
                return res.status(401).render('login', {
                    msg: 'email or password incorrect'
                });
            } else {
                if(!(await bcrypt.compare(password, result[0].passwd))) {
                    return res.status(401).render('login', {
                        msg: 'email or password incorrect'
                    });
                } else {
                    // FIX HERE!!!!!!!!!!!!!!!!!!!!
                    // FIX HERE!!!!!!!!!!!!!!!!!!!!
                    // FIX HERE!!!!!!!!!!!!!!!!!!!!
                    res.send('good');
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}

// register
exports.register = (req, res) => {
    const {username, email, phone, batch, password, confirm_password} = req.body;

    db.query("select email from users where email=?", [email], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.render('register', {msg: 'email id already taken'});
        } else if (password !== confirm_password) {
            return res.render('register', {msg: 'Pwds do not match'});
        }
        let hashedPw = await bcrypt.hash(password, 8);

            db.query("insert into Users set ?", {uid:'0', username:username, email:email, passwd:hashedPw, phone:phone, batch:batch, urole:'Client'}, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    console.log(result);
                    return res.render('register', { msg: "user registration success"});
                }
            })
    });
};