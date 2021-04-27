const bcrypt = require('bcryptjs');
const User = require('../model/users');

const signUp = async (username, password, phone_number, email) => {
  const saltRound = 12;
  const salt = await bcrypt.genSalt(saltRound);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = new User({
    username,
    password: hashPassword,
    phone_number,
    email
  });
  return user.save();
};

const logIn = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
  }
  return null;
};

module.exports = { signUp, logIn };