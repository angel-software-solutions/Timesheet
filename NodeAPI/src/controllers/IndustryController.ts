import { Request, Response } from "express";
import { getConnection } from "typeorm";

class IndustryController {
  static GetAllIndustry = async (req: Request, res: Response) => {
    const query = `select * from Industries order by Name `;
    const result = await getConnection().query(query);
    res.json(result);
  };
}
export default IndustryController;
