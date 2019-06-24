import { getRepository, getConnection } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { Projects } from "../entity/Projects";
import { Guid } from "guid-typescript";

exports.GetAllProjectByTerm = async (req: Request, res: Response) => {
  const searchTerm = req.query.search;
  const query = `select Guid , Number,Description,dbo.[GetProjectLockedDate](Guid) as LockedTillDate 
    from projects 
     where number  like 
    '%${searchTerm}%' or   description like '%${searchTerm}%'
    order by Number`;
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

// exports.Insert = async (req: Request, res: Response) => {
//   const projectRepository = getRepository(Projects);
//   try {
//     let project = new Projects();
//     Object.assign(project, req.body);

//     if (!(project.Guid && project.Guid.length > 0)) {
//       project.Guid = Guid.create()
//         .toString()
//         .toUpperCase();
//       project.CreatedDate = new Date();
//     }

//     let isDuplicate = await ProjectController.isDuplicateTimesheet(
//       timeSheet
//     );
//     if (isDuplicate) {
//       res.status(409).json({ message: "Timesheet already exist." });
//       return;
//     }
//     await timesheetRepository.save(timeSheet);
//   } catch (e) {
//     console.log(e);
//     let msg = { Operation: "Insert", Exception: e };
//     res.status(409).json(msg);
//     return;
//   }

//   //If all ok, send 201 response
//   res.status(201).json("Timesheet created");
// };
