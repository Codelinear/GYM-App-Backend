import mongoose from "mongoose";

const workout = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  equipment: { type: String, required: true },
  reps: { type: String, required: true },
  sets: { type: String, required: true },
  video: { type: String, required: true },
  description: { type: String, required: true },
});
const workoutPlan = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: String, required: true },
  duration: { type: String, required: true },
  difficulty: { type: String, required: true },
  date: { type: String, required: true },
  workouts: [workout],
});

export default mongoose.model("planWorkout", workoutPlan);
