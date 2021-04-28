const express = require('express');
const router = express.Router();
const userController = require('../controller/user');


// signup a user
router.post('/signup',userController.signUp);


// user login
router.post('/login',userController.logIn);


// check session is saved
router.get('/info', userController.userInfo);


// logout
router.get('/logout',userController.logout);


module.exports = router;