const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const database = require("./config/database");
const app = express();
const userRouter = require("./router/user.router");

const port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
database.dbConnection();

app.use("/users", userRouter());


app.listen(port, function () {
    console.log(`Nodejs listening at port: ${port}`);
});