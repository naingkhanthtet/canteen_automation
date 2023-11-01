const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.registerPage = (req, res) => {
    res.render('register');
};

function generateToken(res, uid, page) {
    const token = jwt.sign({id: uid}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const cookieOptions = {
        expires:
            new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ), httpOnly: true,
    };
    res.cookie('joes', token, cookieOptions);
    res.status(200).redirect(page);
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {msg: 'please enter correct email & password'});
        }

        db.query('select * from users where email=?', [email], async (err, result) => {
            // console.log(result);
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
                    if (result[0].urole === "Admin") {
                        generateToken(res, result[0].uid, '/showTotal');
                    } else {
                        generateToken(res, result[0].uid, '/home');
                    }

                }
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.register = (req, res) => {
    const {username, email, phone, batch, password, confirm_password} = req.body;

    db.query("select email, passwd from users where email=? or passwd=?", [email, username, password], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            for (const row of result) {
                if (row.email === email) {
                    return res.render('register', {msg: 'email is already taken'});
                }
                if (row.passwd === password) {
                    return res.render('register', {msg: 'Use another password please'});
                }
            }
        } else if (password !== confirm_password) {
            return res.render('register', {msg: 'Passwords do not match'});
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            // regular expression resource = https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
            return res.render('register', {msg: 'Change password! At least 8 characters, 1 Uppercase, 1 lowercase, 1 special character'});
        }
        let hashedPw = await bcrypt.hash(password, 8);

        db.query("insert into Users set ?", {
            uid: '0',
            username: username,
            email: email,
            passwd: hashedPw,
            phone: phone,
            batch: batch,
            urole: 'Client',
            rawpasswd: password
        }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                // console.log(result);
                return res.render('login', {msg: "user registration success"});
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

        db.query("select * from users where uid=?", [decode.id], (err, result) => {
            if (!result || result.length === 0) {
                console.log('user not found')
                return next();
            }
            req.user = result[0];
            return next();
        });
    } else {
        next();
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.urole === "Admin") {
        return next();
    } else {
        return res.render('error', {
            msgHeader: 'Unauthorized',
            msg: 'You do not have permission to access this page.'
        });
    }
};

exports.addFeedback = (req, res) => {
    const user_id = req.user.uid;
    const {feedback} = req.body;
    try {
        db.query("insert into Feedbacks (uid, feedback) values (?, ?)", [user_id, feedback], (err, result) => {
            if (err) {
                return res.status(500).render('contact_us', {msg: "Cannot give feedback now"});
            } else {
                return res.status(500).render('contact_us', {msg: "Feedback submitted, Thank you for your feedback"});
            }
        });
    } catch (err) {
        console.error(err);
    }
}

exports.resetPassword = (req, res) => {
    try {
        const {email, reset_password, confirm_reset_password} = req.body;
        db.query("select email, rawpasswd from Users where email=? or rawpasswd=?", [email, reset_password], async (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).render('forgot_password', {msg: "Database error"});
            } else if (reset_password !== confirm_reset_password) {
                return res.status(500).render('forgot_password', {msg: "Passwords do not match"});
            } else if (!result || result.length === 0) {
                return res.status(500).render('forgot_password', {msg: "No records found"});
            }

            if (reset_password === result[0].rawpasswd) {
                return res.status(500).render('forgot_password', {msg: "Old password is not allowed."});
            } else if (!reset_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                return res.render('forgot_password', {msg: 'Change password! At least 8 characters, 1 Uppercase, 1 lowercase, 1 special character'});
            } else if (email !== result[0].email) {
                return res.render('forgot_password', {msg: 'This email is not registered.'});
            }

            let hashedPw = await bcrypt.hash(reset_password, 8);
            db.query("update Users set passwd=?, rawpasswd=? where email=?", [hashedPw, reset_password, email], (err, result) => {
                if (err) {
                    return res.status(500).render('forgot_password', {msg: "Unable to reset"});
                } else {
                    return res.status(400).render('login', {msg: "New password updated, try login"});
                }
            });
        });
    } catch (err) {
        console.error(er);
    }
}

// function for menu database selection

const fetchMenu = (role, req, next) => {
    db.query(`select * from menus where mrole='${role}'`, (err, result) => {
        if (err) throw err;
        req[role] = result;
        next();
    });
}

exports.specialItems = async (req, res, next) => {
    fetchMenu('Special', req, next);
};

exports.curryItems = async (req, res, next) => {
    fetchMenu('Curry', req, next);
};

exports.drinkItems = async (req, res, next) => {
    fetchMenu('Drink', req, next);
};

exports.friesItems = async (req, res, next) => {
    fetchMenu('Fries', req, next);
};

exports.saladItems = async (req, res, next) => {
    fetchMenu('Salad', req, next);
};

exports.fastItems = async (req, res, next) => {
    fetchMenu('Fast', req, next);
};

exports.soupItems = async (req, res, next) => {
    fetchMenu('Soup', req, next);
};

exports.submitOrder = async (req, res) => {
    const {uid, food_name, date, food_quantity, food_price, final_price} = req.body;
    db.query("select mname, quantity from Menus where mname=?", [food_name], (err, rows) => {
        if (err) {
            return res.status(500).json({success: false, msg: "Failed to submit"});
        }
        if (rows.length === 1) {
            const current_quantity = rows[0].quantity;
            const fname = rows[0].mname;
            if (current_quantity < food_quantity) {
                return res.status(400).json({success: false, msg: `Not enough ${fname} available`});
            }

            const set_new_quantity = current_quantity - food_quantity;
            db.query("update Menus set quantity=? where mname=?", [set_new_quantity, food_name], (err, update) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        msg: "Failed to set new quantity into menu database"
                    });
                }

                db.query("insert into Ordered (oid, uid, ubatch, uname, mname, odate, quantity, price) values (?, ?, (select batch from Users where uid=?), (select username from Users where uid=?), ?, ?, ?, ?);",
                    [0, uid, uid, uid, food_name, date, food_quantity, food_price],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({success: false, msg: "Failed to submit"});
                        } else {
                            return res.json({success: true, msg: 'Item added to cart'});
                        }
                    });
            })
        }
    });
};

exports.deleteOrdersAfterConfirmed = async (req, res, next) => {
    const {user_id} = req.body;
    db.query("delete from Orders where uid=?", [user_id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            return res.json({success: true, msg: 'Deleted the cart orders'});
        }
    });
}

exports.cart = async (req, res) => {
    const {user_id, food_id, food_name, food_quantity, food_price, button_action} = req.body;

    if (button_action === "add") {
        db.query("insert into Orders set ?", {
            uid: user_id,
            mname: food_name,
            mid: food_id,
            quantity: food_quantity,
            price: food_price
        }, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({success: false, msg: "Failed to add in the cart"});
            } else {
                return res.json({success: true, msg: 'Item added to cart'});
            }
        });
    } else if (button_action === "remove") {
        db.query("delete from Orders where mid=?", [food_id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({success: false, msg: "Failed to remove"});
            } else {
                return res.json({success: true, msg: "Item removed"});
            }
        })
    } else {
        res.status(401).json({success: false, msg: "What u looking for?"});
    }
};

exports.chkCart = async (req, res) => {
    db.query("select mid, mname, price, uid from Orders", (err, result) => {
        if (err) {
            res.status(500).json({error: "Database error"});
        } else {
            res.json(result);
        }
    });
};

exports.cartCount = async (req, res) => {
    const user_id = req.params.userId;
    db.query("select count(uid) as cartCount from Orders where uid=?", [user_id], (err, result) => {
        if (err) {
            res.status(500).json({error: "Database error"});
        } else {
            const cartCount = result[0].cartCount;
            res.json({success: true, cartCount});
        }
    });
};

exports.removeIfZero = async (req, res) => {
    const {itemId} = req.body;
    db.query("delete from Orders where mid=?", [itemId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({success: false, msg: "Failed to remove"});
        } else {
            return res.json({success: true, msg: "Item removed"});
        }
    })
}

exports.returnVoucher = async (req, res, next) => {
    const order_date = req.params.date;
    db.query("select * from OrderHistory where odate=?", [order_date], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            req.returnedVoucher = result;
            req.singleData = result[result.length - 1];
            req.totalPrice = result.reduce((total, item) => total + item.price, 0);
            next();
        }
    });
}

exports.addToOrderHistory = async (req, res) => {
    const user_id = req.params.userId;
    db.query("insert into OrderHistory select * from Ordered where uid=?", [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({success: false, msg: "Failed to insert into OrderHistory database"});
        } else {
            res.redirect('/')
            db.query("delete from Ordered where uid=?", [user_id], (err, result) => {
                if (err) {
                    return res.status(500).json({success: false, msg: "Failed to remove from ordered database"});
                }
            });
        }
    });
}

exports.logout = async (req, res) => {
    res.cookie('joes', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).redirect('/');
};
