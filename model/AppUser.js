import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  //   phone: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  info: { type: Object, default: {} },
});

export default mongoose.model("AppUser", userSchema);
