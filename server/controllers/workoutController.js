const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id: user_id }).sort({
      createdAt: -1,
    }); // for descending order

    return res.status(200).json(workouts);
  } catch (error) {
    console.log("Error getting all workouts ", error);
    return res
      .status(500)
      .json({ message: "Error getting all workouts! ", error: error.message });
  }
};

// get by id
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose?.Types?.ObjectId?.isValid(id)) {
    return res.status(400).json({ message: "Invalid id!" });
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }
    return res.status(200).send(workout);
  } catch (error) {
    console.log("Error getting single workout", error);
    return res
      .status(500)
      .json({ message: "Error getting workout! ", error: error.message });
  }
};

// create new
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields?.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      reps,
      load,
      user_id,
    });
    return res.status(200).json(workout);
  } catch (error) {
    console.log("Error creating workout", error);
    return res
      .status(500)
      .json({ message: "Error creating workout! ", error: error.message });
  }
};

// delete by id
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose?.Types?.ObjectId?.isValid(id)) {
    return res.status(400).json({ message: "Invalid id!" });
  }
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }
    return res
      .status(200)
      .json({ message: "Workout deleted.", deletedWorkout: workout });
  } catch (error) {
    console.log("Error deleting workout", error);
    return res
      .status(500)
      .json({ message: "Error deleting workout! ", error: error.message });
  }
};

// update by id
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose?.Types?.ObjectId?.isValid(id)) {
    return res.status(400).json({ message: "Invalid id!" });
  }
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }
    return res
      .status(200)
      .json({ message: "Workout updated.", updatedWorkout: workout });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting workout! ", error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
