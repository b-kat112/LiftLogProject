"use strict";

const express = require("express");
const router = express.Router();

router.get("/search", (request, response) => {
    response.render("searchExercise");
});

router.post("/search", async (request, response) => {

    const muscle = request.body.muscle;

    const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${muscle}`;

    const apiResponse = await fetch(url, {
        method: "GET",
        headers: {
            "x-rapidapi-key": process.env.API_NINJAS_KEY,
            "x-rapidapi-host": "exercises-by-api-ninjas.p.rapidapi.com"
        }
    });

    const exercises = await apiResponse.json();

    response.render("exerciseResults", {
        exercises: exercises,
        muscle: muscle
    });

});

module.exports = router;