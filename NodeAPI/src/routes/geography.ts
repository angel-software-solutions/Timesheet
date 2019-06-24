import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import GeographyController from "../controllers/GeographyController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  GeographyController.GetAllGeography
);

export default router;
