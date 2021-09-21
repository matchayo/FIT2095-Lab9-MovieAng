const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    bYear: {
        validate: {
            // validator: function (newYear) {
            //     if (Number.isInteger(newYear))
            //         return true;
            //     else return false;
            // }
            validator: Number.isInteger,
            message: "Birth year should be integer"
        },
        type: Number,
        required: true
    },
    movies: [{
        type: mongoose.Schema.ObjectId, //same as mongoose.Schema.Types.ObjectId?
        ref: "Movie"
    }]
});

module.exports = mongoose.model("Actor", actorSchema);