const UsersDAO = require('../dao/users');
const usersDAO = new UsersDAO();

var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
router.use(bodyparser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  usersDAO.getAll((err, users) => {
    if (err) next(err);
    users.forEach(user => {
      delete user.passwordHash;
      delete user.salt;
    });
    res.json(users);
  })
});

// GET user by id
router.get('/:userId', function(req, res, next) {
  usersDAO.getById(req.params.userId, (err, user) => {
    if (err) next(err);
    delete user.passwordHash;
    delete user.salt;
    res.json(user);
  })
});

// Create user
router.post('/', function(req, res, next) {
  usersDAO.create(req.body, (err, newId) => {
    if (err) next(err);
    res.json("newId");
  })
});

module.exports = router;
