// import second from 'first'

import workout from "../model/workout.js";

export const addWorkout = async (req, res) => {
  try {
    const { name, type, equipment, reps, sets, video, description } = req.body;
    // console.log(req.body);
    const work = new workout({
      name,
      type,
      equipment,
      reps,
      sets,
      video,
      description,
    });
    await work.save();
    res.status(200).json({ message: "workout created successfully", work });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bhai erro h sahi code likh" });
  }
};

export const getWorkout = async (req, res) => {
  try {
    const work = await workout.find();
    res.status(200).json(work);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getWorkoutbyid = async (req, res) => {
  try {
    const plan = await workout.findById(req.params.id);
    if (!plan)
      return res.status(404).json({ message: "Workout plan not found" });
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteworkout = async (res, req) => {
  const todele = await workout.findByIdAndDelete(req.params.id);
  if (!todele) {
    res.status(500).json({ message: "workout not found" });
  }
  res.status(400).json({ message: "workout deleted successfully" });
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, equipment, reps, sets, video, description } = req.body;
    const updateData = {
      name,
      type,
      equipment,
      reps,
      sets,
      video,
      description,
    };
    const updatedCustomer = await workout.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "workout updated successfully",
      updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({ message: "bhai sahi me error " });
  }
};
