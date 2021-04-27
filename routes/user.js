const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const session = require('express-session');


router.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));

// signup a user
router.post('/signup', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const phone_number = req.body.phone_number;
    const email = req.body.email;


    const userData = await userController.signUp(username, password, phone_number, email);

    return res.status(201).send(userData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// user login
router.post('/login', async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const sess = req.session;

    const user = await userController.logIn(username, password);
    if (user) {
      sess.username = username;
      return res.status(200).send('user is logged in');
    } else return res.status(401).send('username/password not found');
  } catch (error) {
    res.status(500).send(error.messagge);
  }
});

// check session is saved
router.get('/info', async (req, res) => {
  sess = req.session;
  if (sess.username) {
    res.send(`hello ${sess.username}`)
  }

});


// logout
router.get('/logout', async (req, res) => {
  sess = req.session;
  if (sess.username) {

    req.session.destroy((err) => {
      res.clearCookie('user');
      res.send('destroyed session')
    });
  } else {
    throw new Error('Something went wrong');
  }

});


module.exports = router;