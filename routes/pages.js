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

router.get('/menu', index.isLoggedIn, index.categoryData, (req, res) => {
    if (req.user) {
        res.render('menu_f_user', {
            user: req.user,
            categoryData: req.categoryData,
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

module.exports = router;