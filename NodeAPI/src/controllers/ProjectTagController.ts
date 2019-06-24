import { Request, Response } from "express";
import { getConnection } from "typeorm";

class ProjectTagController {
  static GetAllProjectTag = async (req: Request, res: Response) => {
    const query = `select * from ProjectTags order by Tag `;
    const result = await getConnection().query(query);
    res.json(result);
  };
}
export default ProjectTagController;
