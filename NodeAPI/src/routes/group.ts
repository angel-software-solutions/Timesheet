import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const GroupController = require("../controllers/GroupController");

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], GroupController.getAllGroups);

export default router;
