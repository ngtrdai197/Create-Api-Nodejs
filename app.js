var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var database = require("./config/database");
var cors = require("cors");
var app = express();
var server = require("http").Server(app);
var socketio = require('socket.io')(server);
var ioController = require('./controllers/socketio.controller')(socketio);
var userRouter = require("./router/user.router");
var uploader = require("./router/upload.router");
var port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
database.dbConnection();


app.use("/api", uploader());

app.use("/users", userRouter());


server.listen(port, function () {
    console.log(`Nodejs listening at port: ${port}`);
});