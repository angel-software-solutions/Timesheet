import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import timesheet from "./timesheet";
import employee from "./employee";
import project from "./project";
import task from "./task";
import customer from "./customer";
import customercontact from "./customercontact";
import currency from "./currency";
import industry from "./industry";
import scope from "./scope";

const routes = Router();

routes.use("/api/auth", auth);
routes.use("/api/user", user);
routes.use("/api/timesheet", timesheet);
routes.use("/api/employee", employee);
routes.use("/api/project", project);
routes.use("/api/task", task);
routes.use("/api/customer", customer);
routes.use("/api/customer-contact", customercontact);
routes.use("/api/currency", currency);
routes.use("/api/scope", scope);
routes.use("/api/industry", industry);

export default routes;
