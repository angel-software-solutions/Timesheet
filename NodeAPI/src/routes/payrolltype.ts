import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const PayrollTypesController = require("../controllers/PayrollTypesController");

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  PayrollTypesController.getAllPayrollTypes
);

export default router;
