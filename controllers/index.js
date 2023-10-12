const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.loginPage = (req, res) => {
    res.render('login');
}

exports.registerPage = (req, res) => {
    res.render('register');
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {msg: 'please enter correct email & password'});
        }

        db.query('select * from users where email=?', [email], async (err, result) => {
            console.log(result);
            if (result.length <= 0) {
                return res.status(401).render('login', {
                    msg: 'email or password incorrect'
                });
            } else {
                if (!(await bcrypt.compare(password, result[0].passwd))) {
                    return res.status(401).render('login', {
                        msg: 'email or password incorrect'
                    });
                } else {
                    // FIX HERE!!!!!!!!!!!!!!!!!!!!
                    // FIX HERE!!!!!!!!!!!!!!!!!!!!
                    // FIX HERE!!!!!!!!!!!!!!!!!!!!
                    const id = result[0].uid;
                    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
                    // console.log('token is ' + token);
                    const cookieOptions = {
                        expires:
                            new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ), httpOnly: true,
                    };
                    res.cookie('joes', token, cookieOptions);
                    res.status(200).redirect('/home');
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

        db.query("insert into Users set ?", {
            uid: '0',
            username: username,
            email: email,
            passwd: hashedPw,
            phone: phone,
            batch: batch,
            urole: 'Client'
        }, (err, result) => {
            if (err) {
                throw err;
            } else {
                // console.log(result);
                return res.render('register', {msg: "user registration success"});
            }
        })
    });
};

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.joes) {
        const decode = await promisify(jwt.verify)(
            req.cookies.joes,
            process.env.JWT_SECRET
        );

        db.query ("select * from users where uid=?",
            [decode.id],
            (err, result) => {
                if (!result) {
                    return next();
                }
                req.user = result[0];
                return next();
            });
    } else {
        next();
    }
}