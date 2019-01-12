const User = require("../models/user.model");
const code = require("../config/jsonwebtoken");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = {
    loginUser: function (req, res) {
        User.findOne({ 'username': req.body.username }).then(user => {
            if (user) {
                if (req.body.username === user.username && bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({ id: user._id }, code.secret, { expiresIn: '30s' });
                    return res.status(200).json({ user, token });
                }
            }
            return res.status(404).send({
                message: "User not found with username " + req.body.username
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with username " + req.body.username
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.id
            });
        });
    },

}