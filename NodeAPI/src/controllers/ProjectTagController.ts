import { Request, Response } from "express";
import { getConnection } from "typeorm";

class ProjectTagController {
  static GetAllProjectTag = async (req: Request, res: Response) => {
    const projectGuid = req.params.projectGuid;
    const query = `select * from ProjectTags where ProjectGuid='${projectGuid}' order by Tag `;
    const result = await getConnection().query(query);
    res.json(result);
  };
}
export default ProjectTagController;
