import { Request, Response } from "express";
import { getRepository, getConnection, LessThanOrEqual } from "typeorm";
import { TS } from "typescript-linq/TS";
import { Guid } from "guid-typescript";
import { Employees } from "../entity/Employees";
import { Utils } from "../helpers/Utils";

class EmployeeController {
  // static GetEmployees = async (req: Request, res: Response) => {
  //   const query = `EXEC [dbo].[GetEmployeesForCards] `;

  //   const result = await getConnection().query(query);

  //   let employees = new TS.Collections.List<Employees>(false, result);
  //   res.json(employees);
  // };
  static getAllEmployeesByTerm = async (
    request: Request,
    response: Response
  ) => {
    const searchTerm = request.query.search || "";
    const query = `select E.FirstName                    as firstName,
       E.LastName                     as lastName,
       E.Guid                         as guid,
       E.FirstName + ' ' + E.LastName as fullname,
       E.EmailAddress                 as email
from Employees E
where E.IsActive = 1 and E.FirstName like '%${searchTerm}%' or E.LastName like '%${searchTerm}%'
order by E.FirstName`;

    response.json(await getConnection().query(query));
  };

  static getAllInActiveEmployee = async (
    request: Request,
    response: Response
  ) => {
    response.json(
      await getConnection().query(`SELECT * from Employees where IsActive = 0`)
    );
  };

  static GetEmployees = async (req: Request, res: Response) => {
    const query = "select * from Employees";
    const result = await getConnection().query(query);
    res.json(result);
  };

  static Insert = async (req: Request, res: Response) => {
    //console.log(req.body);
    let employee = new Employees();
    Object.assign(employee, req.body);

    if (!(employee.Guid && employee.Guid.length > 0)) {
      employee.Guid = Guid.create()
        .toString()
        .toUpperCase();
    }
    console.log("Employee Entity: ", employee);
    const employeeRepository = getRepository(Employees);
    try {
      await employeeRepository.save(employee);
    } catch (e) {
      console.log(e);
      res.status(409).json("Error in create Employee");
      return;
    }
    res.status(201).json("Employee created");
  };

  static Update = async (req: Request, res: Response) => {
    let employee = new Employees();
    console.log(req.body);
    Object.assign(employee, req.body);
    console.log(employee);

    const employeeRepository = getRepository(Employees);

    try {
      await employeeRepository.save(employee);
      res.status(200).json();
    } catch (e) {
      console.log(e);
      res.status(409).json("Exception when update employee" + e);
      return;
    }
  };
}

export default EmployeeController;
