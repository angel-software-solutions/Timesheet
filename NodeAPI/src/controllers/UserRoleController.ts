import { getConnection } from "typeorm";
import { Request, Response } from "express";

class UserRoleController {
  static GetAllUserRole = async (req: Request, res: Response) => {
    const query = `select * from UserRoles order by Name`;
    console.log(query);
    const result = await getConnection().query(query);
    res.json(result);
  };
}
export default UserRoleController;
