import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import CustomerContactController from "../controllers/CustomerContactController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  CustomerContactController.GetCustomerContacts
);

router.get(
  "/a",
  [checkJwt, checkRole(["ADMIN"])],
  CustomerContactController.GetCustomerContacts
);

export default router;
