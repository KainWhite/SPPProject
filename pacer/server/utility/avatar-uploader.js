const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const avatarUploader = multer({
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

module.exports = avatarUploader;