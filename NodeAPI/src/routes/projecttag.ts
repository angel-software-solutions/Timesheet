import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import ProjectTagController from "../controllers/ProjectTagController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  ProjectTagController.GetAllProjectTag
);

export default router;
