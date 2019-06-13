import { Request, Response } from "express";
import {
  getRepository,
  getConnection,
  Any,
  ListCollectionsOptions
} from "typeorm";
import { validate, IsNotEmpty } from "class-validator";
import { TS } from "typescript-linq/TS";

import { User } from "../entity/User";
import { NextFunction } from "connect";
import { parse } from "querystring";
import { Timesheets } from "../entity/Timesheets";
import { Utils } from "../helpers/Utils";

class UserController {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "username", "role"] //We dont want to send the passwords on response
    });

    //Send the users object
    res.json(users);
  };

  static GetTimesheets = async (req: Request, res: Response) => {
    const query = `EXEC [dbo].[GetTimesheetOfEmployeeTEST] 
    @EmployeeGuid = '${req.query.EmployeeGuid}',
    @StartDate ='${req.query.StartDate}', 
    @EndDate = '${req.query.EndDate}'`;
    console.log(query);
    let result = await getConnection().query(query);

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
    console.log(distinctProjects);
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
          .toArray();
      });
      projectitem["Tasks"] = tasks;
    });
    //result = JSON.stringify(distinctProjects);
    //console.log(JSON.stringify(distinctProjects));

    res.json(distinctProjects);
  };

  static GetAllTask = async (req: Request, res: Response) => {
    const result = await getConnection().query(
      "Select distinct Description from Features order by Description"
    );
    res.json(result);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"] //We dont want to send the password on response
      });
      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, password, role } = req.body;
    let user = new User();
    user.username = username;
    user.password = password;
    user.role = role;
    //Object.assign(user,req.body);

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("User created");
  };

  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { username, role } = req.body;

    //Try to find user on database
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }

    //Validate the new values on model
    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default UserController;
