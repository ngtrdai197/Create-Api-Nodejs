var mongoose = require("mongoose");
var movieSchema = new mongoose.Schema({
    moviename: {
        type: String,
        required: true
    },
    linkimage: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("movie", movieSchema);