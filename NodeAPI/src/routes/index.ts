import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import timesheet from "./timesheet";
//import roletype from "./roletype";
import project from "./project";
import task from "./task";

const routes = Router();

routes.use("/api/auth", auth);
routes.use("/api/user", user);
routes.use("/api/timesheet", timesheet);
//routes.use("/api/roletype", roletype);
routes.use("/api/project", project);
routes.use("/api/task", task);

export default routes;
