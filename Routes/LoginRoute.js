import express from "express";
import { LoginUser } from "../controller/LoginController.js";

const router = express.Router();

router.post("/", LoginUser);

export default router;
