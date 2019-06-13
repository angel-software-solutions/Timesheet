import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import TimesheetController from "../controllers/TimesheetController";

const router = Router();

//Get all users
//router.get("/", UserControlle`r.listAll);
router.get(
  "/GetAllTimesheetByEmployee",
  [checkJwt, checkRole(["ADMIN"])],
  TimesheetController.GetTimesheets
);

router.get(
  "/GetDate",
  [checkJwt, checkRole(["ADMIN"])],
  TimesheetController.GetDate
);
router.get(
  "/GetAllTask",
  [checkJwt, checkRole(["ADMIN"])],
  TimesheetController.GetAllTask
);

router.get(
  "/GetAllProjectRolesByProject",
  [checkJwt, checkRole(["ADMIN"])],
  TimesheetController.GetAllProjectRolesByProject
);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], TimesheetController.Insert);

//Edit one timesheet
router.patch("/", [checkJwt, checkRole(["ADMIN"])], TimesheetController.Update);

//Delete one user
router.delete(
  "/:ids",
  [checkJwt, checkRole(["ADMIN"])],
  TimesheetController.DeleteTimesheets
);

export default router;
