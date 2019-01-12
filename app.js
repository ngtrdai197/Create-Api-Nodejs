const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const morgan = require("morgan");
const database = require("./config/database");
const cors = require("cors");
const passport = require("passport");
const userRouter = require("./router/user.router");
const movieRouter = require("./router/movie.router");
const uploader = require("./router/file.router"); //upload file
const configPassport = require("./middlewares/passport");
configPassport.configStrategy(); // cấu hình stragety
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(morgan("dev"));
app.use(express.static('./public'));
database.dbConnection();

app.use("/api", uploader());
app.use("/users", userRouter());
app.use("/movies", movieRouter());

app.listen(port, function () {
    console.log(`Nodejs listening at port: ${port}`);
});