const UserSettingsDao = require('../dao/user-settings-dao');
const bodyparser = require('body-parser');

const express = require('express');

const userSettingsRouter = express.Router();
userSettingsRouter.use(bodyparser.json());

userSettingsRouter.get('/:userSettingsId', async function(req, res, next) {
  let daoResponse = await UserSettingsDao.getById(req.params.userSettingsId);
  handleDefaultDaoResponse(daoResponse, res, 'userSettings');
});

userSettingsRouter.put('/:userSettingsId', async function(req, res, next) {
  req.body.id = req.params.userSettingsId;
  let daoResponse = await UserSettingsDao.update(req.body);
  handleDefaultDaoResponse(daoResponse, res, 'userSettings');
});

function handleDefaultDaoResponse(daoResponse, res, propertyName) {
  if (daoResponse.error) {
    res.json(daoResponse);
  } else {
    res.json({[propertyName]: daoResponse});
  }
}

module.exports = userSettingsRouter;
