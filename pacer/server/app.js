const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');

const jwt = require('jwt-simple')
const config = require('./appConfig.json')

const UsersDAO = require('./dao/users');
const usersDAO = new UsersDAO();

const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const app = express();

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth');

  next();
});

// auth middleware
app.use(function (req, res, next) {
  // URLs available for everyone
  if (req.url == "/login" || req.url == '/users/create' || req.url.indexOf("/images") == 0) {
    return next();
  }

  if (!req.headers['x-auth']) {return res.json({error: "Not authorised."})}
    try {
      var email = jwt.decode(req.headers['x-auth'], config.secretKey).email;
    } 
    catch(err) {return res.json({error: "Invalid token."})}

    usersDAO.getByEmail(email, (err, user) => {
      if (err) {return res.json({error: "Invalid token."})}
      req.user = user;
      next();
    })
})

// uploading files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function(req, file, cb) {
    //console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({ //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          // error 500
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
  limits:{
      fileSize: 1024 * 1024
  }
}).single('profilepic');

app.post("/uploadImage", upload, (req, res) => {
  res.json({fileUrl: "http://localhost:3000/images/" + req.file.originalname});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
