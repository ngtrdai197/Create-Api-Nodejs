var mongoose = require("mongoose");
//mongodb://ngtrdai197:anhdaii1@ds239911.mlab.com:39911/dbtest
function dbConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/DbStore", { useNewUrlParser: true }).then(function () {
    }).catch(function (err) {
        process.exit();
    });
    // mongo.exe mongodb://$[hostlist]/$[database]?authSource=$[authSource] --username $[username]
}

module.exports = { dbConnection: dbConnection };