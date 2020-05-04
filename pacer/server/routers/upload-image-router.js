const avatarUploader = require('../utility/avatar-uploader');
const express = require('express');
const bodyparser = require('body-parser');

const uploadImageRouter = express.Router();

uploadImageRouter.use(bodyparser.json());

//! base route '/upload-image'

uploadImageRouter.post('/', avatarUploader, (req, res) => {
  res.json({fileUrl: "http://localhost:3000/images/" + req.file.originalname});
});

module.exports = uploadImageRouter;
