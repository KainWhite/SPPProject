const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authHandler = require('./middleware/auth-handler');
const cors = require('./middleware/cors');

const userRouter = require('./routers/user-router');
const loginRouter = require('./routers/login-router');
const uploadImageRouter = require('./routers/upload-image-router');
const GenericDao = require('./dao/generic-dao');

GenericDao.establishConnection();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ORDER IS IMPORTANT!
app.use(cors);
app.use(authHandler);

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/upload-image', uploadImageRouter);

module.exports = app;
