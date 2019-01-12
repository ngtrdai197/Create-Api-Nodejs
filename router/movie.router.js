var express = require('express');
var router = express.Router();
const passport = require("passport");

var movie = require("../controllers/movie.controller");

module.exports = function () {
    router.get('/api', passport.authenticate('jwt', { session: false }),movie.findAll);
    router.post('/api/create', passport.authenticate('jwt', { session: false }),movie.create);
    router.get('/api/:id', passport.authenticate('jwt', { session: false }),movie.findOne);
    router.put('/api/update/:id', passport.authenticate('jwt', { session: false }),movie.update);
    router.delete('/api/delete/:id',passport.authenticate('jwt', { session: false }), movie.delete);
    return router;
}