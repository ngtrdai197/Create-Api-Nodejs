var User = require("../models/user.model");

module.exports = {
    loginUser: function (req, res) {
        User.findOne({ 'username': req.body.username }).then(user => {
            if (user) {
                if ((req.body.username == user.username) && (req.body.password == user.password)){
                    return res.status(200).json(user);
                }
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