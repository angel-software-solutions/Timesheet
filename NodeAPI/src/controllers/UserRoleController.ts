import { getRepository, getConnection } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

exports.GetAllUserRole = async (req: Request, res: Response) => {
  const searchTerm = req.query.search;
  const query = `select * from UserRoles`;
  console.log(query);
  const result = await getConnection().query(query);
  res.json(result);
};
