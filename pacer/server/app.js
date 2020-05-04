//const createError = require('http-errors');
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
