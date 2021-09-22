const mongoose = require("mongoose");

const Actor = require("../models/actor");
const Movie = require("../models/movie");

module.exports = {
    // getAll: is a function that retrieves all the documents 
    // from the Actor collection and sends them back as a response.
    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.json(err);
            } else {
                res.json(actors);
            }
        });
    },

    // createOne: is a function that creates a new document based on 
    // the parsed data in ‘req.body’ and saves it in ‘Actor’ collection.
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();

        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            console.log("Actor saved");
            res.json(actor);
        });

        // There is another way to insert a new document into a collection 
        // by using ‘Model.create’ function:
/*         Actor.create(newActorDetails, function (err, actor) {
            if (err)
                return res.json(err);
            res.json(actor);
        }); */
    },

    // getOne: this function finds one document by an ID
    getOne: function (req, res) {
        Actor.findOne({_id: req.params.id})
        .populate("movies")
        .exec(function (err, actor) {
            if (err) return res.json(err);
            if (!actor) return res.json(); // if null
            res.json(actor);
        });
    },

    // UpdateOne: this function finds a document by its ID and sets new content 
    // that is retrieved from ‘req.body’
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({_id: req.params.id}, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();

            res.json(actor);
        });
    },

    // deleteOne: this function deletes the document that matches the criteria.
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({_id: req.params.id}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    // addMovie: this function adds a movie ID to the list of movies in an actor’s document.
    addMovie: function (req, res) {
        Actor.findOne({_id: req.params.id}, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({_id: req.body.id}, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    // Delete a movie from an actor
    deleteMovieFromActor: function (req, res) {
        
        Actor.findOne({_id: req.params.aId}, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            console.log(actor);
            Movie.findOne({_id: req.params.mId}, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                console.log(movie);

                var index = -1;
                for (let i = 0; i < actor.movies.length; i++) {
                        let currentMovie = new mongoose.Types.ObjectId(actor.movies[i]);
                    if (currentMovie == req.params.mId) {
                        index = i;
                    }
                }

                if (index === -1) return res.status(404).json()
                    
                actor.movies.splice(index, 1);

                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        });
    }
};