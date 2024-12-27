import express from "express";
import { LoginUser } from "../controller/LoginController.js";
import {
  AddUserInfo,
  GetAppUser,
  LoginAppUser,
  SignupAppUser,
} from "../controller/AppUserController.js";

const router = express.Router();

router.post("/", SignupAppUser);
router.post("/login", LoginAppUser);
router.put("/add", AddUserInfo);
router.get("/", GetAppUser);

export default router;
