var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage: storage });
module.exports = function () {
    router.post("/upload", upload.any(), function (req, res, err) {
        res.status(200).send({message: 'Success'});
    });
    router.get("/files", function (req, res) {
        fs.readdir('./public/uploads', (err, files)=>{
            res.send(files);
        });
    });
    // router.get("/download:filename", function (req, res) {
    //     var filename = req.params.filename;
    //     res.download('./public/uploads' + filename);
    // });
    return router;
}