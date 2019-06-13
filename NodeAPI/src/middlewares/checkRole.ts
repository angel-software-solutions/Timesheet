import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../entity/User";

import settings = require("settings-store");
import { UserAuthModel } from "../Models/UserAuthModel";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const userId = res.locals.jwtPayload.userId;
    const username = res.locals.jwtPayload.username;

    let userAuthmodel = new UserAuthModel();
    let authKey = `${userId}_${username}`;
    Object.assign(userAuthmodel, settings.value(authKey));
    console.log(userAuthmodel);
    if (
      userAuthmodel.emailAddress == username &&
      userAuthmodel.employeeGuid == userId
    ) {
      next();
    } else res.status(401).send();
    //TODO : Check with employee userrole.

    // //Get user role from the database
    // const userRepository = getRepository(User);
    // let user: User;
    // try {
    //   user = await userRepository.findOneOrFail(id);
    // } catch (id) {
    //   res.status(401).send();
    // }

    //Check if array of authorized roles includes the user's role
    // if (roles.indexOf(user.role) > -1) next();
    // else res.status(401).send();
  };
};
