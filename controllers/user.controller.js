var User = require("../models/user.model");

module.exports = {
    // POST a User
    create: function (req, res) {
        console.log('vao');
        // Create a User
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            email: req.body.email
        });
        // Save a User in the MongoDB
        user.save().then(() => {
            res.status(200).json({ status: 'Regiter successfully' });
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
        console.log('vao');

        // Find user and update id
        User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            email: req.body.email

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
