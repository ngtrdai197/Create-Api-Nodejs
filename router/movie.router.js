var express = require('express');
var router = express.Router();
var movie = require("../controllers/movie.controller");

module.exports = function () {
    router.get('/api', movie.findAll);
    router.post('/api/create', movie.create);
    router.get('/api/:id', movie.findOne);
    router.put('/api/update/:id', movie.update);
    router.delete('/api/delete/:id', movie.delete);
    return router;
}