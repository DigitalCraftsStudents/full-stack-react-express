const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router
    .get('/new', userController.newUser)
    .post('/new', userController.processNewUser)

router
    .get('/login', userController.login)
    .post('/login', userController.processLogin);

router.get('/login-status', userController.loginStatus);
router.post('/logout', userController.logout);

module.exports = router;
