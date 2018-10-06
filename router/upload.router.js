var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
var db = require("../config/database");

var storage = require("multer-gridfs-storage")({
    url: 'mongodb://ngtrdai197:anhdaii1@ds239911.mlab.com:39911/dbtest'
});
var upload = multer({ storage: storage });
module.exports = function () {
    router.post("/upload", upload.any(), function (req, res, err) {
        res.status(200).send({message: 'Success'});
    });

    return router;
}