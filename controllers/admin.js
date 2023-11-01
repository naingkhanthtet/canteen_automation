const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.fetchAllMenu = async (req, res, next) => {
    db.query("select * from Menus", (err, result) => {
        req.foodItems = result;
        next();
    });
}

exports.fetchAllOrderHistory = async (req, res, next) => {
    db.query("select * from OrderHistory", (err, result) => {
        req.orders = result;
        next();
    });
}

exports.fetchAllUsers = async (req, res, next) => {
    db.query("select * from Users", (err, result) => {
        req.allUsers = result;
        next();
    });
}

exports.fetchAllFeedbacks = async (req, res, next) => {
    db.query("select * from Feedbacks", (err, result) => {
        if (err) {
            console.error(err);
        } else {
            req.feedbacks = result;
            next();
        }
    })
}

exports.addToMenuDB = async (req, res) => {
    const {food_name, food_category, food_note, food_quantity, food_price, food_image} = req.body;
    db.query("insert into menus (mname, mnote, quantity, price, mrole, imgUrl) values (?, ?, ?, ?, ?, ?)",
        [food_name, food_note, food_quantity, food_price, food_category, food_image], (err, result) => {
            if (err) {
                return res.status(500).render('admin/menu_add', {msg: "Failed to add into database"});
            } else {
                return res.status(200).render('admin/menu_add', {msg: 'Menu added to Database'});
            }
        });
}

exports.addToUserDB = async (req, res) => {
    const {username, urole, email, password, phone, batch} = req.body;
    let hashedPw = await bcrypt.hash(password, 8);
    db.query("insert into Users (username, email, passwd, phone, batch, urole, rawpasswd) values (?, ?, ?, ?, ?, ?, ?)",
        [username, email, hashedPw, phone, parseInt(batch), urole, password],
        (err, result) => {
            if (err) {
                return res.status(500).render('admin/user_add', {msg: "Failed to edit"});
            } else {
                return res.status(200).render('admin/user_add', {msg: `${username} added to database.`});
            }
        });
}

exports.editUserPage = async (req, res, next) => {
    const user_id = req.params.uid;
    db.query("select * from Users where uid=?", [user_id], (err, result) => {
        if (err) {
            return res.status(500).render('admin/user_view', {msg: "error occurs, cannot edit a user"});
        } else {
            req.editUserData = result;
            next();
        }
    });
}

exports.editMenuPage = async (req, res, next) => {
    const menu_id = req.params.mid;
    db.query("select * from menus where mid=?", [menu_id], (err, result) => {
        if (err) {
            return res.status(500).render('admin/menu_view', {msg: "error occurs, cannot edit"});
        } else {
            req.editMenuData = result;
            next();
        }
    })
}

exports.deleteMenu = async (req, res, next) => {
    const menu_id = req.params.mid;
    db.query("delete from menus where mid=?", [menu_id], (err, result) => {
        if (err) {
            return res.status(500).render('admin/menu_view', {msg: "error occurs, cannot delete"});
        } else {
            next();
        }
    });
}

exports.confirmUserEdit = async (req, res) => {
    const user_id = req.params.uid;
    const {username, urole, email, password, phone, batch} = req.body;
    let hashedPw = await bcrypt.hash(password, 8);
    db.query("update Users set username=?, email=?, passwd=?, rawpasswd=?, urole=?, phone=?, batch=? where uid=?",
        [username, email, hashedPw, password, urole, phone, parseInt(batch), user_id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).render('admin/user_edit', {msg: "Failed to edit"});
            } else {
                return res.status(200).render('admin/user_edit', {msg: `${username} updated`});
            }
        });
}

exports.confirmMenuEdit = async (req, res) => {
    const menu_id = req.params.mid;
    const {food_name, food_category, food_note, food_quantity, food_price, food_image} = req.body;
    db.query("update menus set mname=?, mnote=?, quantity=?, price=?, mrole=?, imgUrl=? where mid=?",
        [food_name, food_note, food_quantity, food_price, food_category, food_image, menu_id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).render('admin/menu_edit', {msg: "Failed to edit"});
            } else {
                return res.status(200).render('admin/menu_add', {msg: `${food_name} updated`});
            }
        });
}

exports.deleteOrder = async (req, res, next) => {
    const order_id = req.params.oid;
    db.query("delete from OrderHistory where oid=?", [order_id], (err, result) => {
        if (err) {
            return res.status(500).render('admin/order_view', {msg: "error occurs, cannot remove"});
        } else {
            next();
        }
    });
}

exports.deleteFeedback = async (req, res, next) => {
    const feedback_id = req.params.fid;
    db.query("delete from Feedbacks where fid=?", [feedback_id], (err, result) => {
        if (err) {
            return res.status(500).render('admin/feedback_view', {msg: "error occurs, cannot remove"});
        } else {
            next();
        }
    });
}

exports.showTotal = async (req, res, next) => {
    try {
        db.query("select count(uid) as user_count from Users", (err, user_count) => {
            if (err) {
                console.error(err);
            } else {
                db.query("select count(oid) as order_count from OrderHistory", (err, order_count) => {
                    if (err) {
                        console.error(err);
                    } else {
                        db.query("select count(fid) as feedback_count from Feedbacks", (err, feedback_count) => {
                            if (err) {
                                console.error(err);
                            } else {
                                db.query("select count(mid) as menu_count from Menus", (err, menu_count) => {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        req.total_count = {
                                            user_count: user_count[0].user_count,
                                            order_count: order_count[0].order_count,
                                            feedback_count: feedback_count[0].feedback_count,
                                            menu_count: menu_count[0].menu_count
                                        };
                                        next();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
    }
}
