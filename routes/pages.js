const express = require('express');
const router = express.Router();
const index = require('../controllers/index');

router.get(['/', '/login'], index.loginPage);

router.get('/register', index.registerPage)

router.get('/home', index.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('home', {user: req.user});
    } else {
        res.redirect('/login');
    }
})

module.exports = router;