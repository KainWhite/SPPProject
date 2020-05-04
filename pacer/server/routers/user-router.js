const UserDAO = require('../dao/user-dao');
const express = require('express');
const bodyparser = require('body-parser');

const userRouter = express.Router();

userRouter.use(bodyparser.json());

//! base route '/users'

/**
 * Get all users
 */
userRouter.get('/', async function(req, res, next) {
  const daoResponse = await UserDAO.getAll();
  handleDefaultDaoResponse(daoResponse, res, 'users');
});

/**
 * Get user by id
 */
userRouter.get('/:userId', async function(req, res, next) {
  const daoResponse = await UserDAO.getById(req.params.userId);
  handleDefaultDaoResponse(daoResponse, res, 'user');
});

/**
 * Create user
 */
userRouter.post('/create', async function(req, res, next) {
  const daoResponse = await UserDAO.create(req.body);
  handleDefaultDaoResponse(daoResponse, res, 'user');
});

/**
 * Update user
 */
userRouter.put('/:userId', async function(req, res, next) {
  req.body.id = req.params.userId;
  const daoResponse = await UserDAO.update(req.body);
  handleDefaultDaoResponse(daoResponse, res, 'user');
});

/**
 * Update avatar
 */
userRouter.put('/:userId/update-avatar', async function(req, res, next) {
  const daoResponse = await UserDAO.updateAvatar(
      req.params.userId, req.body.imageUrl);
  handleDefaultDaoResponse(daoResponse, res, 'user');
});

function handleDefaultDaoResponse(daoResponse, res, propertyName) {
  if (daoResponse.error) {
    res.json(daoResponse);
  } else {
    res.json({[propertyName]: daoResponse});
  }
}

module.exports = userRouter;
