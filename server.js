"use strict";

require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

const app = express();
const portNumber = process.env.PORT || 5001;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (request, response) => {
    response.render("index");
});

app.use("/workouts", workoutRoutes);
app.use("/exercises", exerciseRoutes);

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("Connected to MongoDB");

        app.listen(portNumber, () => {
            console.log(`Server running at http://localhost:${portNumber}`);
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();