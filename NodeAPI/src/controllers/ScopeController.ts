import { Request, Response } from "express";
import { getConnection } from "typeorm";

class ScopeController {
  static GetAllScope = async (req: Request, res: Response) => {
    const query = `select * from Scopes order by Name `;
    const result = await getConnection().query(query);
    res.json(result);
  };
}
export default ScopeController;
