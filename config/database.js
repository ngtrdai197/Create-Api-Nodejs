var mongoose = require("mongoose");

function dbConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://ngtrdai197:anhdaii1@ds239911.mlab.com:39911/dbtest", { useNewUrlParser: true }).then(function () {
        console.log('Connected to MongoDB');
    }).catch(function (err) {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });
}
module.exports = { dbConnection: dbConnection };