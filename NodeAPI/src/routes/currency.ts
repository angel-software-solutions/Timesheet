import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import CurrencyController from "../controllers/CurrencyController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  CurrencyController.GetAllCurrency
);

export default router;
