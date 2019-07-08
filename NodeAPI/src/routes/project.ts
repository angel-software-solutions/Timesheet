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
  "/get-project/:guid",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.GetProjectByGUID
);

router.get(
  "/get-project-expense/:guid",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.getProjectExpense
);

router.get(
  "/get-project-roles/:guid",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectController.getProjectRolesByGuid
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
