var mongoose = require("mongoose");

function dbConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://ngtrdai197:anhdaii1@ds239911.mlab.com:39911/dbtest", { useNewUrlParser: true }).then(function () {
    }).catch(function (err) {
        process.exit();
    });
}
module.exports = { dbConnection: dbConnection };