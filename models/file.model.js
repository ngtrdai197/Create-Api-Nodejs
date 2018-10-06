var mongoose = require("mongoose");

var fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("file", fileSchema);