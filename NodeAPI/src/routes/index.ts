import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import timesheet from "./timesheet";
//import roletype from "./roletype";
import project from "./project";
import task from "./task";
import customer from "./customer";
import customercontact from "./customercontact";
import employee from "./employee";
const routes = Router();

routes.use("/api/auth", auth);
routes.use("/api/user", user);
routes.use("/api/timesheet", timesheet);
//routes.use("/api/roletype", roletype);
routes.use("/api/project", project);
routes.use("/api/task", task);
routes.use("/api/customer", customer);
routes.use("/api/customer-contact", customercontact);
routes.use("/api/employee", employee);

export default routes;
