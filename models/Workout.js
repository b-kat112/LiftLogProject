"use strict";

const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    exerciseName: String,
    muscleGroup: String,
    sets: Number,
    reps: Number,
    weight: Number,
    notes: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Workout", workoutSchema);