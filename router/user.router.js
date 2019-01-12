var express = require('express');
var router = express.Router();
const passport = require("passport");
var user = require("../controllers/user.controller");
var login = require("../controllers/login.controller");

module.exports = function () {
    //router /api cần phải có token mới có thể get đc data
    router.get('/api', passport.authenticate('jwt', { session: false }), user.findAll);

    router.post('/api/create', passport.authenticate('jwt', { session: false }), user.create);

    router.get('/api/:id', passport.authenticate('jwt', { session: false }), user.findOne);

    router.put('/api/update/:id', passport.authenticate('jwt', { session: false }), user.update);

    router.delete('/api/delete/:id', passport.authenticate('jwt', { session: false }), user.delete);

    // router login => login thành công sẽ trả về 1 token
    router.post('/login', login.loginUser);
    return router;
}