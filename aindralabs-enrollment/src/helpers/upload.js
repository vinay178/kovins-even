require("dotenv").config();
const multer = require('multer')
const fs = require('fs')
const path = require('path');

let parentPath = process.env.IMAGE_PARENT_PATH

var imageDirectory = path.join(parentPath , 'images');
fs.existsSync(imageDirectory) || fs.mkdirSync(imageDirectory);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imageDirectory)
    },
    filename: function (req, file, cb) {
      cb(null,  file.originalname)
    },

});
const upload =  multer({ storage: storage});

module.exports = upload;
