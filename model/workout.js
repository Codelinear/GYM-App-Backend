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

// export default mongoose.model("")
export default mongoose.model("workout", workout);
