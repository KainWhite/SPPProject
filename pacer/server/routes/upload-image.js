const avatarUploader = require('../utility/avatar-uploader');

var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
router.use(bodyparser.json());

router.post('/', avatarUploader, (req, res) => {
  res.json({fileUrl: "http://localhost:3000/images/" + req.file.originalname});
}); 

module.exports = router;