const UserDAO = require('../dao/user-dao');
const PublicUser = require('../entities/user');
const express = require('express');
const bodyparser = require('body-parser');

const userRouter = express.Router();

userRouter.use(bodyparser.json());

//! base route '/users'

/**
 * Get all users
 */
userRouter.get('/', async function(req, res, next) {
  let daoResponse = await UserDAO.getAll();
  if (!daoResponse.error) {
    daoResponse = daoResponse.map(user => new PublicUser(user));
  }
  handleDefaultDaoResponse(daoResponse, res, 'users');
});

/**
 * Get user by id
 */
userRouter.get('/:userId', async function(req, res, next) {
  let daoResponse = await UserDAO.getById(req.params.userId);
  if (!daoResponse.error) {
    daoResponse = new PublicUser(daoResponse);
  }
  handleDefaultDaoResponse(daoResponse, res, 'user');
});

/**
 * Create user
 */
userRouter.post('/create', async function(req, res, next) {
  let daoResponse = await UserDAO.create(req.body);
  if (!daoResponse.error) {
    daoResponse = new PublicUser(daoResponse);
  }
  handleDefaultDaoResponse(daoResponse, res, 'user');
});

/**
 * Update user
 */
userRouter.put('/:userId', async function(req, res, next) {
  req.body.id = req.params.userId;
  let daoResponse = await UserDAO.update(req.body);
  if (!daoResponse.error) {
    daoResponse = new PublicUser(daoResponse);
  }
  handleDefaultDaoResponse(daoResponse, res, 'user');
});

/**
 * Update avatar
 */
userRouter.put('/:userId/update-avatar', async function(req, res, next) {
  let daoResponse = await UserDAO.updateAvatar(
      req.params.userId, req.body.imageUrl);
  if (!daoResponse.error) {
    daoResponse = new PublicUser(daoResponse);
  }
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
