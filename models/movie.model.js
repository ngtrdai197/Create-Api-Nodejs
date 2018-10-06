var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
    moviename: {
        type: String,
        require: true
    },
    linkimage: {
        type: String,
        require: true
    },
    linkvideo: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("movie", movieSchema);