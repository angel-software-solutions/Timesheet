import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import ScopeController from "../controllers/ScopeController";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], ScopeController.GetAllScope);

export default router;
