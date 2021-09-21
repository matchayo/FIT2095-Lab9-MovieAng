const mongoose = require("mongoose");

const Actor = require("../models/actor");
const Movie = require("../models/movie");

module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    
    // deleteOne: this function deletes the document that matches the criteria.
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({title: req.params.title}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    deleteBetweenYears: function (req, res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;
        
        Movie.deleteMany().where("year").gte(year1).lte(year2).exec(function (err, docs) {
            if (err) return res.status(400).json(err);
            if (!docs) return res.status(404).json();
                res.json("Deleted");
        });
    },
    

    addActorToMovie: function (req, res) {
        Movie.findOne({_id: req.params.id}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            console.log(req.body);
            Actor.findOne({_id: req.body._id}, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },
};