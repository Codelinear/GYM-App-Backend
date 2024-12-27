import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("Login", LoginSchema);
