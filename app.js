const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const database = require("./config/database");
const cors = require("cors");
const app = express();
const userRouter = require("./router/user.router");
const movieRouter = require("./router/movie.router");
const uploader = require("./router/file.router"); //upload file
const port = process.env.PORT || 3000;

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

app.listen(port, function () {
    console.log(`Nodejs listening at port: ${port}`);
});