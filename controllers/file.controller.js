const FILE = require("../models/file.model");

module.exports = {
    create: function (req, res) {
        const file = FILE({
            filename: req.files[0].filename,
            fileOriginal: req.files[0].originalname,
            uploadDate: new Date().toString()
        });
        file.save().then(() => {
            res.status(200).json({ status: 'Create a file successful' });
        }).catch(err => {
            req.status(500).json({
                message: err.message
            });
        });
    }
}