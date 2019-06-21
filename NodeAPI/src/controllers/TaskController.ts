import { getRepository, getConnection } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

exports.GetAllTaskByTerm = async (req: Request, res: Response) => {
  const searchTerm = req.query.search;
  const projectGuid = req.query.selectedProjectGuid;

  //const query = `select Guid, Description from features
  //where featureheadingguid in (select Guid from FeatureHeadings where ProjectGuid = '${projectGuid}') and description like '%${searchTerm}%'`;
  const query = `select Guid, Description from features 
  where (FeatureStatusGuid!='F5EB6D59-DFA1-44A7-BB82-A0B8D28E6F14' or FeatureStatusGuid is null) and 
  featureheadingguid in (select Guid from FeatureHeadings where ProjectGuid = '${projectGuid}') and 
  description like '%${searchTerm}%'
  order by SortOrder`;

  console.log(query);

  const result = await getConnection().query(query);
  res.json(result);
};
