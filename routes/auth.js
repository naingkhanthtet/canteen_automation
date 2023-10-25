const express = require('express');
const router = express.Router();
const userController = require('../controllers');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/resetPasswordPage', (req, res) => {
    res.render('forgot_password');
})

router.post('/resetPassword', userController.resetPassword);

module.exports = router;