const UsersDAO = require('../dao/users');
const usersDAO = new UsersDAO();

var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
router.use(bodyparser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  usersDAO.getAll((err, users) => {
    if (err) {
      res.json({error: "Something went wrong."});
      return;
    }
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
    if (err || !user) {
      res.json({error: "Invalid id or user not found."});
      return;
    }
    delete user.passwordHash;
    delete user.salt;
    res.json(user);
  })
});

// Create user
router.post('/', function(req, res, next) {
  usersDAO.create(req.body, (err, newId) => {
    if (err) {
      res.json({error: err});
      return;
    }

    usersDAO.getById(newId, (err, user) => {
      if (err || !user) {
        res.json({error: "Something went wrong."});
        return;
      }
      delete user.passwordHash;
      delete user.salt;
      res.json(user);
    })
  })
});

// Update user
router.put('/:userId', function(req, res, next) {
  req.body.id = req.params.userId;
  usersDAO.update(req.body, (err) => {
    if (err) {
      res.json({error: err});
      return;
    }

    usersDAO.getById(req.params.userId, (err, user) => {
      if (err || !user) {
        res.json({error: "Something went wrong."});
        return;
      }
      delete user.passwordHash;
      delete user.salt;
      res.json(user);
    })
  })
});

module.exports = router;
