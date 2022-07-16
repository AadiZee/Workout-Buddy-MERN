import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setEmptyFields(json?.emptyFields);
      setError(
        `${json && json?.message ? json?.message : ""} - ${json?.error}`
      );
    }
    if (response.ok) {
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("new workout added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Workout Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <label>Load (in Kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
