import express from "express";
import {
  addplan,
  deletworkout,
  editWorkout,
  getplan,
  getplanbyid,
  getPlansByDate,
  getworkoutbyid,
  update,
  updatePlanWorkout,
} from "../controller/PlanController.js";

const router = express.Router();

router.get("/", getplan);
router.get("/:date", getPlansByDate);
router.get("/:id", getplanbyid);
router.get("/plans/:planId/workouts/:workoutId", getworkoutbyid);
router.put("/plans/:planId/workouts/:workoutId", editWorkout);

router.post("/", addplan);
router.put("/:id", update);
router.delete("/", deletworkout);

export default router;
