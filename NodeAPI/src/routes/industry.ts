import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import IndustryController from "../controllers/IndustryController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  IndustryController.GetAllIndustry
);

export default router;
