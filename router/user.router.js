var express = require('express');
var router = express.Router();
var user = require("../controllers/user.controller");
var login = require("../controllers/login.controller");

module.exports = function () {
    router.get('/api', user.findAll);

    router.post('/api/create', user.create);

    router.get('/api/:id', user.findOne);

    router.put('/api/update/:id', user.update);

    router.delete('/api/delete/:id', user.delete);

    // router login
    router.post('/login/:username', login.loginUser);
    return router;
}