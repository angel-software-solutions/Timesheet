import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import EmployeeController from "../controllers/EmployeeController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  EmployeeController.GetAllEmployees
);

export default router;
