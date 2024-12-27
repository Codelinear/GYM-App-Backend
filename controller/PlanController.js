import mongoose from "mongoose";
import workoutPlan from "../model/plan.js";

export const getplan = async (req, res) => {
  try {
    const plans = await workoutPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json("message", error);
  }
};
// export const getPlansByDate = async (req, res) => {
//   try {
//     const { date } = req.query; // Get date from query parameter

//     if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//     }

//     const plans = await workoutPlan.find({ date: new Date(date) }); // Replace `date` with the correct field name in your schema
//     res.status(200).json(plans);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getPlansByDate = async (req, res) => {
  try {
    const { date } = req.params;
    // console.log("Date parameter:", date);
    if (!date) {
      return res
        .status(400)
        .json({ message: "Date route parameter is required" });
    }

    // Use a regex to match the beginning of the string
    const regex = new RegExp(`^${date}`);

    const plans = await workoutPlan.find({
      date: { $regex: regex },
    });

    // console.log("Plans found:", plans);

    res.status(200).json(plans);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getplanbyid = async (req, res) => {
  try {
    // console.log(req.params.id);
    const plans = await workoutPlan.findById(req.params.id);
    if (!plans)
      return res.status(404).json({ message: "Workout plan not found" });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getworkoutbyid = async (req, res) => {
  try {
    const { planId, workoutId } = req.params;
    // console.log("Plan ID:", planId);
    // console.log("Workout ID:", workoutId);

    // Convert IDs to ObjectId
    const planObjectId = mongoose.Types.ObjectId.isValid(planId)
      ? new mongoose.Types.ObjectId(planId)
      : null;
    const workoutObjectId = mongoose.Types.ObjectId.isValid(workoutId)
      ? new mongoose.Types.ObjectId(workoutId)
      : null;

    if (!planObjectId || !workoutObjectId) {
      return res.status(400).json({ message: "Invalid Plan ID or Workout ID" });
    }

    // Aggregation to fetch workout by ID
    const result = await workoutPlan.aggregate([
      { $match: { _id: planObjectId } }, // Match the parent plan
      { $unwind: "$workouts" }, // Decompose workouts array
      { $match: { "workouts._id": workoutObjectId } }, // Match specific workout
      { $project: { workouts: 1, _id: 0 } }, // Return only the workout
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Workout not found in the plan" });
    }

    res.status(200).json(result[0].workouts); // Return the matched workout
  } catch (error) {
    console.error("Error fetching workout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ?//////////////////////////////////
export const editWorkout = async (req, res) => {
  try {
    const { planId, workoutId } = req.params;
    const { name, type, equipment, reps, sets, video, description } = req.body;

    // console.log("Plan ID:", planId);
    // console.log("Workout ID:", workoutId);

    // Convert IDs to ObjectId
    const planObjectId = mongoose.Types.ObjectId.isValid(planId)
      ? new mongoose.Types.ObjectId(planId)
      : null;
    const workoutObjectId = mongoose.Types.ObjectId.isValid(workoutId)
      ? new mongoose.Types.ObjectId(workoutId)
      : null;

    if (!planObjectId || !workoutObjectId) {
      return res.status(400).json({ message: "Invalid Plan ID or Workout ID" });
    }

    // Update the specific workout inside the plan
    const updatedPlan = await workoutPlan.findOneAndUpdate(
      { _id: planObjectId, "workouts._id": workoutObjectId }, // Match plan and workout
      {
        $set: {
          "workouts.$.name": name,
          "workouts.$.type": type,
          "workouts.$.equipment": equipment,
          "workouts.$.reps": reps,
          "workouts.$.sets": sets,
          "workouts.$.video": video,
          "workouts.$.description": description,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Workout or Plan not found" });
    }

    res.status(200).json({
      message: "Workout updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addplan = async (req, res) => {
  try {
    const { name, calories, duration, difficulty, workouts, date } = req.body;
    const newPlan = new workoutPlan({
      name,
      calories,
      duration,
      difficulty,
      date,
      workouts,
    });
    await newPlan.save();
    res
      .status(200)
      .json({ message: "Workout plan created successfully", plan: newPlan });
  } catch (err) {
    res.status(400).json({ message: "Error creating workout plan", err });
  }
};

// export const addplanworkout = async (req, res) => {

// };

export const updatePlanWorkout = async (req, res) => {
  try {
    const { planId, workoutId } = req.params;
    const workoutData = req.body; // The updated workout data

    // Update the specific workout using the positional operator ($)
    const updatedPlan = await workoutPlan.findOneAndUpdate(
      { _id: planId, "workouts._id": workoutId }, // Match the plan and the specific workout
      { $set: { "workouts.$": workoutData } }, // Update the matched workout
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Workout or plan not found" });
    }

    res
      .status(200)
      .json({ message: "Workout updated successfully", plan: updatedPlan });
  } catch (error) {
    res.status(400).json({ message: "Error updating workout", error });
  }
};

export const deletworkout = async (req, res) => {
  try {
    const { id } = req.params;
    const todele = await workoutPlan.findByIdAndDelete(id);
    if (!todele)
      return res.status(404).json({ message: "Workout plan not found" });

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(400).json({ message, error });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, calories, duration, difficulty, workouts } = req.body;
    const updateData = {
      name,
      calories,
      duration,
      difficulty,
      workouts,
    };
    const updatedCustomer = await workoutPlan.findByIdAndUpdate(
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
