const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    // POST a User
    create: function (req, res) {
        const user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, saltRounds),
            fullname: req.body.fullname,
            email: bcrypt.hashSync(req.body.email, saltRounds)
        });
        user.save().then((user) => {
            res.status(200).send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    },

    // FETCH all Users
    findAll: function (req, res) {
        User.find().then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    },

    // FETCH a user
    findOne: function (req, res) {
        User.findById(req.params.id).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
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
    },
    // UPDATE a user
    update: function (req, res) {
        // Find user and update id
        User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, saltRounds),
            fullname: req.body.fullname,
            email: bcrypt.hashSync(req.body.email, saltRounds)

        }, { new: true }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
    },
    // DELETE a User
    delete: function (req, res) {
        User.findByIdAndRemove(req.params.id).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
    }
}
