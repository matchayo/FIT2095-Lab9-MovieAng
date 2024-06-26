const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const actors = require("./routers/actor");
const movies = require("./routers/movie");

const app = express();

app.listen(8080);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

mongoose.connect("mongodb://localhost:27017/FIT2095_Lab9", function (err) {
    if (err) {
        return console.log("Mongoose - connection error:", err);
    }
    console.log("Connect Successfully");
});

app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:aId/:mId', actors.deleteMovieFromActor);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:title', movies.deleteOne);
app.delete('/movies/:year1/:year2', movies.deleteBetweenYears);
app.put('/movies/:id/actors', movies.addActorToMovie);