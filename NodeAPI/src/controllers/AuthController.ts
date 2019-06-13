import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository, getConnection, Any } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";
import { BroadcasterResult } from "typeorm/subscriber/BroadcasterResult";
import { UserAuthModel } from "../Models/UserAuthModel";
const md5 = require("md5");
import settings = require("settings-store");

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    let encryptedPassword = md5(password);
    const query = `select top 1 * from Employees where emailaddress = '${username}' and password = '${encryptedPassword}' `;
    let result: any;
    //Get user from database
    //const userRepository = getRepository(User);
    //let user: User;
    try {
      //      user = await userRepository.findOneOrFail({ where: { username } });
      //console.log(query);

      result = await getConnection().query(query);
      //console.log(result);
    } catch (error) {
      res.status(401).send();
    }
    if (result.length <= 0)
      res.status(401).json({ Message: "Invalid username and password!" });
    let _userauthmodel = new UserAuthModel();
    if (result) {
      _userauthmodel.emailAddress = result[0].EmailAddress;
      _userauthmodel.username = result[0].UserName;
      _userauthmodel.authToken = "";
      _userauthmodel.employeeGuid = result[0].Guid;
      _userauthmodel.firstName = result[0].FirstName;
      _userauthmodel.lastName = result[0].LastName;
    }
    //console.log(_userauthmodel);
    //Check if encrypted password match
    // if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //   res.status(401).send();
    //   return;
    // }

    //Sing JWT, valid for 1 day
    const token = jwt.sign(
      {
        userId: _userauthmodel.employeeGuid,
        username: _userauthmodel.emailAddress
      },
      config.jwtSecret,
      { expiresIn: "1d" }
    );

    _userauthmodel.authToken = token;
    let authKey = `${_userauthmodel.employeeGuid}_${
      _userauthmodel.emailAddress
    }`;
    settings.setValue(authKey, _userauthmodel);
    //Send the jwt in the response
    res.json(_userauthmodel);
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
