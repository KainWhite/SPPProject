const UserDAO = require('../dao/user-dao');
const jwt = require('jwt-simple')
const sha512 = require('../utility/sha512').sha512;
const config = require('../app-config.json')
const express = require('express');
const bodyparser = require('body-parser');

const loginRouter = express.Router();

loginRouter.use(bodyparser.json());

//! base route '/login'

loginRouter.post ('/', async function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.json({error: "Not enough data provided."});
    return;
  }
  const email = req.body.email;
  const password = req.body.password;
  const user = await UserDAO.getByEmail(email);
  if (!user) {
    res.json({error: "Such user doesn't exist."});
    return;
  }
  const hash = sha512(password, user.salt)
  if (hash.passwordHash === user.passwordHash) {
    // success
    const token = jwt.encode({email: email}, config.secretKey)

    delete user.passwordHash;
    delete user.salt;

    res.json({token: token, currentUser: user})
  }
  else {
    res.json({error: "Invalid password."});
  }
});

module.exports = loginRouter;
