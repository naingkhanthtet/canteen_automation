const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const userController = require("../controllers");
// const {returnVoucher} = require("../controllers");

// Pages
router.get(['/', '/login'], index.loginPage);
router.get('/register', index.registerPage);
router.get('/home', index.isLoggedIn, index.specialItems, (req, res) => {
    if (req.user) {
        res.render('home', {user: req.user, specials: req.Special});
    } else {
        res.redirect('/login');
    }
});
router.get('/menu', index.isLoggedIn, index.curryItems, index.drinkItems, index.friesItems, index.saladItems, index.fastItems, index.soupItems, (req, res) => {
    if (req.user) {
        res.render('menu_f_user', {
            user: req.user,
            curryItems: req.Curry,
            drinkItems: req.Drink,
            friesItems: req.Fries,
            saladItems: req.Salad,
            fastItems: req.Fast,
            soupItems: req.Soup
        });
    } else {
        res.redirect('/login');
    }
});
router.get('/aboutus', index.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('about_us', {user: req.user});
    } else {
        res.redirect('/login');
    }
});
router.get('/contactus', index.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('contact_us', {user: req.user});
    } else {
        res.redirect('/login');
    }
});
router.get('/voucherPage/:date', index.isLoggedIn, index.returnVoucher, (req, res) => {
    if (req.user) {
        res.render('voucher', {
            user: req.user, returnedVoucher: req.returnedVoucher, singleData: req.singleData, totalPrice: req.totalPrice
        });
    } else {
        res.redirect('/login');
    }
});
router.get('/addToOrderHistory/:userId', index.isLoggedIn, index.addToOrderHistory);


// Admin pages
router.get('/viewItems', index.isLoggedIn, index.isAdmin, index.fetchAllMenu, (req, res) => {
    if (req.user) {
        res.render('admin/menu_view', {foodItems: req.foodItems});
    } else {
        res.redirect('/login');
    }
});
router.get('/viewClients', index.isLoggedIn, index.isAdmin, index.fetchAllUsers, (req, res) => {
    if (req.user) {
        res.render('admin/user_view', {allUsers: req.allUsers});
    } else {
        res.redirect('/login');
    }
});
router.get('/viewClientOrders', index.isLoggedIn, index.isAdmin, index.fetchAllOrderHistory, (req, res) => {
    if (req.user) {
        res.render('admin/order_view', {orders: req.orders});
    } else {
        res.redirect('/login');
    }
});
router.get('/addItem', index.isLoggedIn, index.isAdmin, (req, res) => {
    res.render('admin/menu_add')
});
router.get('/addUser', index.isLoggedIn, index.isAdmin, (req, res) => {
    res.render('admin/user_add')
});
router.post('/addToMenuDB', index.isLoggedIn, index.isAdmin, index.addToMenuDB);
router.get('/editMenuPage/:mid', index.isLoggedIn, index.isAdmin, index.editMenuPage, (req, res) => {
    if (req.user) {
        res.render('admin/menu_edit', {editMenuData: req.editMenuData});
    } else {
        res.redirect('/login');
    }
});
router.get('/deleteMenu/:mid', index.isLoggedIn, index.isAdmin, index.deleteMenu, (req, res) => {
    if (req.user) {
        res.redirect('/viewItems');
    } else {
        res.redirect('/login');
    }
});
router.post('/confirmMenuEdit/:mid', index.isLoggedIn, index.isAdmin, index.confirmMenuEdit);
router.get('/deleteOrder/:oid', index.isLoggedIn, index.isAdmin, index.deleteOrder, (req, res) => {
    if (req.user) {
        res.redirect('/viewClientOrders');
    } else {
        res.redirect('/login');
    }
});


// Cart
router.post('/delCartOrders', index.isLoggedIn, index.deleteOrdersAfterConfirmed);
router.post('/addCart', index.isLoggedIn, index.cart);
router.get('/checkCart', index.isLoggedIn, index.chkCart);
router.get('/cartCount/:userId', index.isLoggedIn, index.cartCount);
router.get('/inCart', index.isLoggedIn, index.chkCart);
router.post('/removeIfZero', index.isLoggedIn, index.removeIfZero);
router.post('/submitOrder', index.isLoggedIn, index.submitOrder);

module.exports = router;
