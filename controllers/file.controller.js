var File = require("../models/file.model");

module.exports = {
    create: function (req, res) {
        const file = new File({
            filename: req.params.filename
        });
        file.save().then(() => {
            res.status(200).json({ status: 'Create file successfully' });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    },

    findAll: function (req, res) {
        File.find().then(file => {
            res.send(file);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    },
    findOne: function (req, res) {
        File.findById(req.params.id).then(file => {
            if (!file) {
                return res.status(404).send({
                    message: "file not found with id " + req.params.id
                });
            }
            res.send(file);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "file not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving file with id " + req.params.id
            });
        });
    },
    update: function (req, res) {
        File.findByIdAndUpdate(req.params.id, {
            filename: req.params.filename
        }, { new: true }).then(file => {
            if (!file) {
                return res.status(404).send({
                    message: "file not found with id " + req.params.id
                });
            }
            res.send(file);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "file not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating file with id " + req.params.id
            });
        });
    },
    delete: function (req, res) {
        File.findByIdAndRemove(req.params.id).then(file => {
            if (!file) {
                return res.status(404).send({
                    message: "file not found with id " + req.params.id
                });
            }
            res.send({ message: "file deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "file not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete file with id " + req.params.id
            });
        });
    }
}