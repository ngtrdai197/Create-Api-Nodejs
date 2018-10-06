var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var database = require("./config/database");
var cors = require("cors");

var app = express();
var userRouter = require("./router/user.router");
var movieRouter = require("./router/movie.router");
var port = process.env.PORT || 3000;
app.use(cors());
app.options('*', cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
database.dbConnection();


app.use("/users", userRouter());
app.use("/movies", movieRouter());

app.listen(port, function () {
    console.log(`Nodejs listening at port: ${port}`);
});