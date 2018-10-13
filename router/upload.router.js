var express = require('express');
var multer = require('multer');
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage: storage });
module.exports = function () {
    router.post("/upload", upload.any(), function (req, res) {
        res.status(200).send(req.files);
    });
    return router;
}