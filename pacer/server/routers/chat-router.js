const UserDAO = require("../dao/user-dao");
const ChatDAO = require('../dao/chat-dao');
const MessageDAO = require('../dao/message-dao');
const express = require('express');
const bodyparser = require('body-parser');

const chatRouter = express.Router();

chatRouter.use(bodyparser.json());

chatRouter.get('/:userId', async function(req, res, next) {
    const daoResponse = await ChatDAO.getAllByOwner(req.params.userId);
    handleResponse(daoResponse, res, 'chats');
});

chatRouter.get('/user/:userId', async function(req, res, next) {
    const daoResponse = await UserDAO.getById(req.params.userId);
    handleResponse(daoResponse, res, 'user');
});

chatRouter.get('/chat/id', async function(req, res, next) {
    let daoResponse = await ChatDAO.getByUsers(req.params.user1Id, req.params.user2Id);
    if (daoResponse.error) {
        res.json(daoResponse);
        return;
    }
    daoResponse = await MessageDAO.getByChat(daoResponse.chatId);
    handleResponse(daoResponse, res, 'history');
});

chatRouter.post('/:userId', async function(req, res, next) {
    const daoResponse = await MessageDAO.create(req.body);
    handleResponse(daoResponse, res, 'message');
});

// chatRouter.put('/:userId', async function(req, res, next) {
//     const daoResponse = await ChatDAO.update(req.body);
//     handleResponse(daoResponse, res, 'message');
// });

function handleResponse(daoResponse, res, propertyName) {
    if (daoResponse.error) {
        res.json(daoResponse);
    } else {
        res.json({[propertyName]: daoResponse});
    }
}

module.exports = chatRouter;
