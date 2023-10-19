const express = require('express');
const router = express.Router();
const index = require('../controllers/index');

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

router.post('/addCart', index.isLoggedIn, index.cart);

router.get('/checkCart', index.isLoggedIn, index.chkCart);
router.get('/cartCount/:userId', index.isLoggedIn, index.cartCount);

module.exports = router;
