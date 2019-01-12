const passportJWT = require("passport-jwt");
const passport = require('passport');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/user.model");
const code = require("../config/jsonwebtoken");

module.exports = {
    configStrategy: function () {
        const opts = {};
        opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = code.secret;
        passport.use(new JWTStrategy(opts, function (payload, done) {
            User.findOne({_id: payload.id }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });

        }));
    }

}