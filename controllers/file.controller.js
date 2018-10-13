var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var fs = require('fs');
module.exports = {
    uploadFile: function (req, res) {
        var gfs = Grid(mongoose.connection.db, mongoose.mongo);
        var writeStream = gfs.createWriteStream();

        fs.createReadStream(req.file.path).pipe(writeStream);

        writeStream.on('close', function (file) {
            res.status(200).send({ fileId: file._id });
        });
        writeStream.on('error', function (e) {
            res.status(500).send("Could not upload file");
        });
    },
    findAll: function (req, res) {
        var gfs = Grid(mongoose.connection.db, mongoose.mongo);
        gfs.findOne({ _id: req.params.id }, function (err, file) {
            if (err) {
                res.status(404).end();
            } else if (!file) {
                res.status(404).end();
            } else {
                var readstream = gfs.createReadStream({
                    _id: file._id
                });

                res.set('Content-Type', file.contentType);

                readstream.on('error', function (err) {
                    res.send(500, err);
                });
                readstream.on('open', function () {
                    readstream.pipe(res);
                });
            }
        });
    },
    findOne: function (req, res) {
        File.findById(req.params._id).then(file => {
            if (!file) {
                return res.status(404).send({
                    message: "file not found with filename " + req.params.filename
                });
            }
            res.send(file);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "file not found with id " + req.params.filename
                });
            }
            return res.status(500).send({
                message: "Error retrieving file with id " + req.params.filename
            });
        });
    },
}