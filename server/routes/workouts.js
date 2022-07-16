const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// Get all workouts
router.get("/", getWorkouts);

// Get single workout
router.get("/:id", getWorkout);

// Post a new workout
router.post("/", createWorkout);

// Deleting a workout
router.delete("/:id", deleteWorkout);

// Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
