import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
const TaskController = require("../controllers/TaskController");

const router = Router();

//Get all Task by term
router.get(
  "/autocomplete",
  [checkJwt, checkRole(["ADMIN"])],
  TaskController.GetAllTaskByTerm
);

export default router;
