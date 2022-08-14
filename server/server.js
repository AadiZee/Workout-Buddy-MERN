const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");

// express app
const app = express();

// to use middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// router handler to react to requests
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    // listen for api requests on port
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB successfully!");
      console.log("Listening on port 3001!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
