var express = require('express');
var router = express.Router();
var user = require("../controllers/user.controller");

module.exports = function () {
    router.get('/api', user.findAll);
    router.post('/api/create', user.create);
    router.get('/api/:id', user.findOne);
    router.put('/api/update/:id', user.update);
    router.delete('/api/delete/:id', user.delete);
    return router;
}