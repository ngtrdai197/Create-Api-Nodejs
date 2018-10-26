var Movie = require("../models/movie.model");

module.exports = {
    // POST a Movie
    create: function (req, res) {
        // Create a Movie
        const movie = new Movie({
            moviename: req.body.moviename,
            linkimage: req.body.linkimage,
        });
        console.log(movie);

        // Save a Movie in the MongoDB
        movie.save().then(() => {
            res.status(200).send({ status: 'Create successfully' });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    },

    // FETCH all Movie
    findAll: function (req, res) {
        Movie.find().then(movie => {
            res.send(movie);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    },

    // FETCH a movie
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
    // UPDATE a Movie
    update: function (req, res) {
        // Find movie and update it
        console.log('data log ne: ' + req);

        Movie.findByIdAndUpdate(req.params.id, {
            moviename: req.body.moviename,
            linkimage: req.body.linkimage,

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
    // DELETE a Movie
    delete: function (req, res) {
        Movie.findByIdAndRemove(req.params.id).then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            res.send({ message: "Movie deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete movie with id " + req.params.id
            });
        });
    }
}
