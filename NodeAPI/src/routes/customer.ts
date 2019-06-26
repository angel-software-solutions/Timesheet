import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import CustomerController from "../controllers/CustomerController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  CustomerController.GetAllCustomer
);
router.get(
  "/:customerGuid",
  [checkJwt, checkRole(["ADMIN"])],
  CustomerController.GetCustomerByGuid
);

router.post("/", [checkJwt, checkRole(["ADMIN"])], CustomerController.Insert);

// router.patch("/", [checkJwt, checkRole(["ADMIN"])], CustomerController.Update);

router.delete(
  "/:ids",
  [checkJwt, checkRole(["ADMIN"])],
  CustomerController.DeleteCustomer
);
export default router;
