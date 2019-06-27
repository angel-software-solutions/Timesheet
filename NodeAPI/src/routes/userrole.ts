import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import UserRoleController from "../controllers/UserRoleController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  UserRoleController.GetAllUserRole
);

export default router;
