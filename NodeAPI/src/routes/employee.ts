import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import EmployeeController from "../controllers/EmployeeController";

const router = Router();

//Get all users
router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  EmployeeController.GetEmployees
);

router.post("/", [checkJwt, checkRole(["ADMIN"])], EmployeeController.Insert);

router.patch("/", [checkJwt, checkRole(["ADMIN"])], EmployeeController.Update);

export default router;
