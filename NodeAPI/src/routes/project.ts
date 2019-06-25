import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import ProjectController from "../controllers/ProjectController";

const router = Router();

router.get(
  "/autocomplete",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.GetAllProjectByTerm
);

router.get(
  "/GetAllProjectTypes",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.GetAllProjectTypes
);

router.get(
  "/GetAllProjectStatuses",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.GetAllProjectStatuses
);

export default router;
