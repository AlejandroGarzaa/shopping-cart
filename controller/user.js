const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/users');
const session = require('express-session');
const route = express.Router();

route.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));


const signUp = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const phone_number = req.body.phone_number;
  const email = req.body.email;

  try {
    const userExist = await User.findOne({ username: username });

    if (userExist) {
      console.log("user already exist");
      res.status(400).send("user already exist")
      return;
    }
    if (password.length < 5) {
      console.log("minimum 5 character password")
      res.status(400).send("minimum 5 character password ")
      return;
    }
    if (phone_number.toString().length !== 10) {
      console.log("insert 10 digit phone number")
      res.status(400).send("insert 10 digit phone number")
      return;

    }
    
    if (userExist==null) {
      
      const saltRound = 12;
      const salt = await bcrypt.genSalt(saltRound);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: hashPassword,
        phone_number,
        email
      });
      newUser.save();
      console.log(`User ${newUser.username} created succesfully`);
      return res.status(201).send(`User ${newUser.username} created succesfully`);
    }


  } catch (error) {
    res.status(400).send(error.message);
  }

};



const logIn = async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sess = req.session;
try{
  const user = await User.findOne({ username: username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      sess.username = username;
      res.status(200).send('user is logged in');
      return user;
    }
  } else{
    return res.status(401).send('username/password not found');
  }
}catch (error) {
  res.status(500).send(error.messagge);
}
};


const userInfo = async (req, res) => {
  sess = req.session;
  if (sess.username) {
    res.send(`hello ${sess.username}`)
  }

};

const logout = async (req, res) => {
  sess = req.session;
  if (sess.username) {

    req.session.destroy((err) => {
      res.clearCookie('user');
      res.send('destroyed session')
    });
  } else {
    throw new Error('Something went wrong');
  }

};


module.exports = { signUp, logIn, userInfo, logout };