var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var database = require("./config/database");
var cors = require("cors");
var app = express();
var server = require("http").Server(app);
var socketio = require('socket.io')(server, {path:'/chat'}); // localhost:4200/chat
require('./controllers/socketio.controller')(socketio); //socketIO
var userRouter = require("./router/user.router");
var uploader = require("./router/upload.router"); //upload file
var movieRouter = require("./router/movie.router");
var port = process.env.PORT || 3000;
app.use(cors());
app.options('*', cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
database.dbConnection();

app.use("/api", uploader());
app.use("/users", userRouter());
app.use("/movies", movieRouter());

server.listen(port, function () {
    console.log(`Nodejs listening at port: ${port}`);
});