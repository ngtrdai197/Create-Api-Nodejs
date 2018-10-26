const express = require('express');
const multer = require('multer');
const router = express.Router();
const file = require("../controllers/file.controller");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
module.exports = function () {
    router.post("/upload", upload.any(), file.create);
    return router;
}