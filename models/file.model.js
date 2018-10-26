var mongoose = require("mongoose");

var fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    fileOriginal: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("file", fileSchema);