import { getRepository, getConnection } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

exports.GetAllProjectByTerm = async (req: Request, res: Response) => {
  const searchTerm = req.query.search;
  const query = `select Guid , Number,Description,dbo.[GetProjectLockedDate](Guid) as LockedTillDate 
    from projects 
     where number  like 
    '%${searchTerm}%' or   description like '%${searchTerm}%'    order by Number`;
  console.log(query);
  const result = await getConnection().query(query);
  res.json(result);
};

exports.GetAllProjectTypes = async (req: Request, res: Response) => {
  const q = `select * from ProjectTypes order by code`;
  const pts = await getConnection().query(q);
  res.json(pts);
};

exports.GetAllProjectStatuses = async (req: Request, res: Response) => {
  const q = `select * from Status order by code`;
  const ps = await getConnection().query(q);
  res.json(ps);
};
