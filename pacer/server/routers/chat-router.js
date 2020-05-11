const UserDAO = require("../dao/user-dao");
const ChatDAO = require('../dao/chat-dao');
const MessageDAO = require('../dao/message-dao');
const express = require('express');
const bodyparser = require('body-parser');

const chatRouter = express.Router();

chatRouter.use(bodyparser.json());

chatRouter.get('/:userId', async function(req, res, next) {
    let daoResponse = await ChatDAO.getAllByOwner(req.params.userId);
    handleResponse(daoResponse, res, 'chats');
});

chatRouter.get('/user/:userId', async function(req, res, next) {
    let daoResponse = await UserDAO.getById(req.params.userId);
    handleResponse(daoResponse, res, 'user');
});

chatRouter.get('/chatId/:user1Id/:user2Id', async function(req, res, next) {
    let daoResponse = await ChatDAO.getByUsers(req.params.user1Id, req.params.user2Id);
    handleResponse(daoResponse, res, 'chat');
});

chatRouter.get('/chat/:chatId', async function(req, res, next) {
    let daoResponse  = await MessageDAO.getByChat(req.params.chatId);
    handleResponse(daoResponse, res, 'history');
});

chatRouter.post('/chatCreate/:user1Id/:user2Id', async function(req, res, next) {
    let daoResponse = await ChatDAO.create({user1Id: req.params.user1Id, user2Id: req.params.user2Id});
    handleResponse(daoResponse, res, 'chat');
});

chatRouter.post('/message', async function(req, res, next) {
    let daoResponse = await MessageDAO.create(req.body);
    handleResponse(daoResponse, res, 'message');
});

chatRouter.get('/lastMessage/:chatId', async function(req, res, next) {
    let daoResponse = await MessageDAO.getLastMessage(req.params.chatId);
    handleResponse(daoResponse, res, 'message');
});

function handleResponse(daoResponse, res, propertyName) {
    if (daoResponse.error) {
        res.json(daoResponse);
    } else {
        res.json({[propertyName]: daoResponse});
    }
}

module.exports = chatRouter;
