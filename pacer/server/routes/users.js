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
    res.json(users);
  })
});

// GET user by id
router.get('/:userId', function(req, res, next) {
  usersDAO.getById(req.params.userId, (err, user) => {
    if (err) next(err);
    res.json(user);
  })
});

module.exports = router;
