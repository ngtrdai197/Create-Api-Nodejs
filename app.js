var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var database = require("./config/database");
var app = express();
var userRouter = require("./router/user.router");
var port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
database.dbConnection();


app.use("/users", userRouter());


app.listen(port, function () {
    console.log(`Nodejs listening at port: ${port}`);
});