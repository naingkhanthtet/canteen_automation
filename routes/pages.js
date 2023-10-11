const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', function (req, res) {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/home', userController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('home', {user:req.user});
    } else {
        res.redirect('/login');
    }
    res.render('home');
})

module.exports = router;