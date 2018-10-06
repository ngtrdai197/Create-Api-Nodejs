var Movie = require("../models/movie.model");

module.exports = {
    create: function (req, res) {
        const movie = new Movie({
            moviename: req.body.moviename,
            linkimage: req.body.linkimage,
            linkvideo: req.body.linkvideo
        });
        movie.save().then(() => {
            res.status(200).json({ status: 'Create movie successfully' });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    },

    findAll: function (req, res) {
        Movie.find().then(movie => {
            res.send(movie);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    },
    findOne: function (req, res) {
        Movie.findById(req.params.id).then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            res.send(movie);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Movie with id " + req.params.id
            });
        });
    },
    update: function (req, res) {
        Movie.findByIdAndUpdate(req.params.id, {
            moviename: req.body.moviename,
            linkimage: req.body.linkimage,
            linkvideo: req.body.linkvideo


        }, { new: true }).then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            res.send(movie);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating movie with id " + req.params.id
            });
        });
    },
    delete: function (req, res) {
        Movie.findByIdAndRemove(req.params.id).then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: "movie not found with id " + req.params.id
                });
            }
            res.send({ message: "movie deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "movie not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete movie with id " + req.params.id
            });
        });
    }
}