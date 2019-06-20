import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import CustomerController from "../controllers/CustomerController";

const router = Router();

router.get(
    "/GetAllCustomers",
    [checkJwt, checkRole(["ADMIN"])],
    CustomerController.GetAllCustomer
  );

  router.post("/", [checkJwt, checkRole(["ADMIN"])], CustomerController.Insert);

  router.patch("/",[checkJwt, checkRole(["ADMIN"])],CustomerController.Update);

export default router;