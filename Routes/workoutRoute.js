import express from "express";
import {
  addWorkout,
  deleteworkout,
  getWorkout,
  getWorkoutbyid,
  update,
} from "../controller/Addworkout.js";

const router = express.Router();

router.post("/", addWorkout);
router.get("/", getWorkout);
router.get("/:id", getWorkoutbyid);
router.put("/:id", update);
router.delete("/:id", deleteworkout);

export default router;
