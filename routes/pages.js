const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    res.render('index_test');
})

router.get('/register', (req, res) => {
    res.render('register_test');
})

module.exports = router;