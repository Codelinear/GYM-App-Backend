import express from "express";
import { connectDatabse } from "./config/db.js";
// import Login from "./Routes/Login.js";
import workout from "./Routes/workoutRoute.js";
import Login from "./Routes/LoginRoute.js";
import planRoute from "./Routes/planRoute.js";
import AppUserRoute from "./Routes/AppUserRoute.js";

import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
connectDatabse();

app.use("/api/login", Login);
app.use("/api/workout", workout);
app.use("/api/plan", planRoute);
app.use("/api/AppUser", AppUserRoute);

app.listen(8000, () => {
  console.log("server listen on 8000");
});
