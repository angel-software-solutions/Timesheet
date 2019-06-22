import { Request, Response } from "express";
import { getRepository, getConnection, LessThanOrEqual } from "typeorm";
import { TS } from "typescript-linq/TS";
import { validate } from "class-validator";
import { Guid } from "guid-typescript";
import { NextFunction } from "connect";
import { parse } from "querystring";
import { Timesheets } from "../entity/Timesheets";
import { TimesheetTemp } from "../entity/TimesheetTemp";
import { testentity } from "../entity/TestEntity";
import { Utils } from "../helpers/Utils";
import { DateUtils } from "../../node_modules/typeorm/util/DateUtils";
const dateformat = require("dateformat");

class TimesheetController {
  static GetDate = async (req: Request, res: Response) => {
    const timeSheetrepo = getRepository(Timesheets);
    let timesheet = await timeSheetrepo.find({
      Guid: "ADE5F3B7-77B3-CCAC-BF62-E75686A7B251"
    });

    //const query = `select * from timesheets where guid='ADE5F3B7-77B3-CCAC-BF62-E75686A7B251'`;
    //const result = await getConnection().query(query);
    console.log(timesheet);
    res.json(timesheet);
  };

  static GetTimesheets = async (req: Request, res: Response) => {
    let currentDate = new Date();
    const query = `EXEC [dbo].[GetTimesheetOfEmployee] 
    @EmployeeGuid = '${req.query.EmployeeGuid}',
    @StartDate ='${req.query.StartDate}', 
    @EndDate = '${req.query.EndDate}'`;
    //console.log(query);

    const result = await getConnection().query(
      query
      //"select fh.Description as 'FeatureHeading',      (select Description as 'Task' from Features as f       where f.FeatureHeadingGuid in (fh.Guid)      for json path) as 'Tasks'     from FeatureHeadings as fh          for json path"
      // "EXEC [dbo].[GetTimesheetOfEmployee] @EmployeeGuid = 'E40466E2-94ED-4356-B2AA-0B7070433F62', @StartDate = '2019-03-02', @EndDate = '2019-04-28'"
    );
    //console.log(result);
    //res.json(result);

    // let resultKey = Object.keys(result[0])[0];
    // let finalResult = result[0][resultKey].toString();
    // // // console.log(finalResult);
    // if (finalResult.length > 0) res.json(JSON.parse(finalResult));
    // else res.json([]);

    let timesheets = new TS.Collections.List<Timesheets>(false, result);
    let projects = timesheets
      .select(function(x) {
        return {
          ProjectGuid: x.ProjectGuid,
          Project: x.Project,
          ProjectDescription: x.ProjectDescription
        };
      })
      .toArray();
    let projectProps: any = ([] = ["ProjectGuid", "Project"]);
    const distinctProjects = Utils.GetDistinctArray(projects, projectProps);
    distinctProjects.forEach(projectitem => {
      let tasksArray = timesheets
        .where(x => x.ProjectGuid == projectitem.ProjectGuid)
        .select(function(task) {
          return {
            FeatureGuid: task.FeatureGuid,
            Task: task.Task,
            ProjectRoleGuid: task.ProjectRoleGuid,
            ProjectRole: task.ProjectRole
          };
        })
        .toArray();
      let properties: any = ([] = ["FeatureGuid", "ProjectRoleGuid"]);
      let tasks = Utils.GetDistinctArray(tasksArray, properties);
      tasks.forEach(taskitem => {
        taskitem["Timesheets"] = timesheets
          .where(
            t =>
              t.FeatureGuid == taskitem.FeatureGuid &&
              t.ProjectGuid == projectitem.ProjectGuid
          )
          .toList()
          //.forEach(x => (x.Date = new Date(x.Date).toLocaleString()))
          .toArray();
      });
      projectitem["Tasks"] = tasks;
    });

    res.json(distinctProjects);
  };

  static GetAllProjectRolesByProject = async (req: Request, res: Response) => {
    let ProjectGuid = req.query.ProjectGuid;
    const searchTerm = req.query.search;
    const query = `select r.Code,pr.ProjectGuid,pr.Guid as ProjectRoleGuid from Roles  r
    inner join ProjectRoles pr on r.Guid =  pr.RoleGuid
    where pr.ProjectGuid='${ProjectGuid}' and code  like '%${searchTerm}%'`;
    console.log(query);
    const result = await getConnection().query(query);

    //console.log(result);
    res.json(result);
  };
  static GetAllTask = async (req: Request, res: Response) => {
    const result = await getConnection().query(
      "Select distinct Description from Features order by Description"
    );
    res.json(result);
  };

  static Insert = async (req: Request, res: Response) => {
    // res.status(409).json("Error in create timesheet");
    // return;
    const timesheetRepository = getRepository(Timesheets);
    try {
      let timeSheet = new Timesheets();
      Object.assign(timeSheet, req.body);

      if (!(timeSheet.Guid && timeSheet.Guid.length > 0)) {
        timeSheet.Guid = Guid.create()
          .toString()
          .toUpperCase();
        //timeSheet.Date = new Date(timeSheet.Date.toUTCString());
        timeSheet.CreatedDate = new Date();
        timeSheet.IncludeInSR = false;
        timeSheet.OTMultiplier = 1;
        timeSheet.DTMultiplier = 1;
        timeSheet.EmployeeRate = 10;
        timeSheet.IsApproved = false;
        //let utcDate = DateUtils.mixedDateToDate(timeSheet.Date.toString(), true);
        // console.log("UTC DATE: " + typeof utcDate, typeof timeSheet.Date);
        //timeSheet.Date = utcDate.toString();
      }
      console.log("Timesheet Entity: ", timeSheet);

      let isDuplicate = await TimesheetController.isDuplicateTimesheet(
        timeSheet
      );
      if (isDuplicate) {
        res.status(409).json({ message: "Timesheet already exist." });
        return;
      }
      await timesheetRepository.save(timeSheet);
    } catch (e) {
      console.log(e);
      let msg = { Operation: "Insert", Exception: e };
      res.status(409).json(msg);
      return;
    }

    //If all ok, send 201 response
    res.status(201).json("Timesheet created");
  };

  static Update = async (req: Request, res: Response) => {
    //Get the ID from the url
    //const id = req.params.id;

    //Get values from the body
    //const { username, role } = req.body;

    let timeSheet = new Timesheets();
    console.log(req.body);
    Object.assign(timeSheet, req.body);
    console.log(timeSheet);

    ////Try to find user on database
    const timesheetRepository = getRepository(Timesheets);

    try {
      await timesheetRepository.save(timeSheet);
      res.status(200).json();
    } catch (e) {
      res.status(409).json("Exception when update timesheet" + e);
      return;
    }
  };

  static DeleteTimesheets = async (req: Request, res: Response) => {
    //Get the ID from the url

    let ids = req.params.ids;
    let idsArray = ids.split(",");

    let query = "delete from timesheets where guid in (";
    for (let index = 0; index < idsArray.length; index++) {
      query += `'${idsArray[index]}',`;
    }
    query = query.substring(0, query.length - 1) + ")";

    //console.log(query);

    try {
      await getConnection().query(query);
    } catch (error) {
      res.status(404).send("Exception in delete timesheets");
      return;
    }
    // userRepository.delete(id);

    // //After all send a 204 (no content, but accepted) response
    res.status(204).json({ message: "Timesheets deleted successfully" });
  };

  static isDuplicateTimesheet = async (timeSheet: Timesheets) => {
    let timesheetrepository = getRepository(Timesheets);
    let timesheetDate = dateformat(new Date(timeSheet.Date), "yyyy-mm-dd");
    let query = `select count(*) as Count from timesheets 
    where FeatureGuid ='${timeSheet.FeatureGuid}'
    and EmployeeGuid='${timeSheet.EmployeeGuid}'
    and ProjectRoleGuid='${timeSheet.ProjectRoleGuid}'
    and  CONVERT(date,date)='${timesheetDate}'`;
    let result = await timesheetrepository.query(query);

    if (
      result.length > 0 &&
      result[0].Count != "undefined" &&
      result[0].Count > 0
    )
      return true;
    else return false;
  };
}

export default TimesheetController;
