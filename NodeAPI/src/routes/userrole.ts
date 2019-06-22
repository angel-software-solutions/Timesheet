import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
const UserRoleController = require("../controllers/UserRoleController");

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  UserRoleController.GetAllUserRole
);

export default router;
