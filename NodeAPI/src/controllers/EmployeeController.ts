import { Request, Response } from "express";
import { getConnection } from "typeorm";

class EmployeeController {
  static GetAllEmployees = async (req: Request, res: Response) => {
    const query = `select * from Employees order by FirstName `;
    const employees = await getConnection().query(query);
    res.json(employees);
  };
}
export default EmployeeController;
