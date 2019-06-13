import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
const ProjectController = require("../controllers/ProjectController");

const router = Router();

router.get(
  "/autocomplete",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.GetAllProjectByTerm
);

export default router;
