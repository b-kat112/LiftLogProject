"use strict";

const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/add", (request, response) => {
    response.render("addWorkout");
});

router.post("/add", async (request, response) => {
    const workout = new Workout({
        exerciseName: request.body.exerciseName,
        muscleGroup: request.body.muscleGroup,
        sets: Number(request.body.sets),
        reps: Number(request.body.reps),
        weight: Number(request.body.weight),
        notes: request.body.notes
    });

    await workout.save();
    response.redirect("/workouts");
});

router.get("/", async (request, response) => {
    const workouts = await Workout.find().sort({ dateCreated: -1 });
    response.render("savedWorkouts", { workouts: workouts });
});

router.post("/delete", async (request, response) => {
    await Workout.deleteOne({ _id: request.body.workoutId });
    response.redirect("/workouts");
});

module.exports = router;