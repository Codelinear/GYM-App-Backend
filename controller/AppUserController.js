import jwt from "jsonwebtoken";
import AppUser from "../model/AppUser.js";
import bcrypt from "bcryptjs";
// const adminEmail = "admin@example.com";
// const adminPassword = "securepassword";

export const SignupAppUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!password || !email) {
    return res
      .status(400)
      .json({ message: "Email or phone and password are required." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AppUser({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user.", error: err.message });
  }
};

export const LoginAppUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res
      .status(400)
      .json({ message: "Email or phone and password are required." });
  }
  try {
    const user = await AppUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, "JWT_SECRET", { expiresIn: "1d" });
    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Error logging in.", error: err.message });
  }
};

export const AddUserInfo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized." });

  try {
    const decoded = jwt.verify(token, "JWT_SECRET");
    const { id } = decoded;

    // Fetch the current user data
    const user = await AppUser.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Merge the existing info with the new updates
    const currentInfo = user.info || {};
    const updates = req.body;
    const mergedInfo = { ...currentInfo, ...updates };

    // Save the updated info back to the database
    user.info = mergedInfo;
    await user.save();

    res.json({ message: "User info updated successfully.", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user info.", error: err.message });
  }
};

export const GetAppUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized." });

  try {
    const decoded = jwt.verify(token, "JWT_SECRET");
    const { id } = decoded;

    const user = await AppUser.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving user info.", error: err.message });
  }
};
