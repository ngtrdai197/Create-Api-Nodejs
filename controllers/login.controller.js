var User = require("../models/user.model");
var bcrypt = require("bcrypt");
var secure = require("../config/jwt");
var jwt = require("jsonwebtoken");
module.exports = {
    loginUser: function (req, res) {
        User.findOne({ 'username': req.body.username }).then(user => {
            if (user) {
                var invalidPassword = bcrypt.compareSync(req.body.password, user.password);
                if ((req.body.username == user.username) && invalidPassword) {
                    var payload = {
                        username: user.username,
                        password: user.password,
                        fullname: user.fullname,
                        email: user.email,
                        _id: user._id
                    };
                    var token = jwt.sign(payload, secure.secret, { expiresIn: 3600 });
                    jwt.verify(token, secure.secret, function (err, decoded) {
                        if (err) {
                            return res.status(404).json({ status: false });
                        } else {
                            return res.status(200).json({ token: token, status: true, user: user.fullname });
                        }
                    });
                }
                return res.end();
            }
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.id
            });
        });
    }
}