import { getRepository, getConnection } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { Projects } from "../entity/Projects";
import { Guid } from "guid-typescript";

class ProjectController {
  static GetAllProjectByTerm = async (req: Request, res: Response) => {
    const searchTerm = req.query.search;
    let query: string = `
select S.Code                             as status,
       C.ClientName                       as client,
       P.Number                           as number,
       P.Description                      as description,
       P.Guid                             as guid,
       dbo.[GetProjectLockedDate](P.Guid) as LockedTillDate
from Projects P
         left join Status S on P.StatusGuid = S.Guid
         left join Customers C on C.Guid = P.CustomerGuid
where P.Number like '%${searchTerm}%'
   or P.Description like '%${searchTerm}%'
    `;
    if (req.query.projectStatus && (req.query.projectStatus || "").length > 0) {
      query += ` and P.StatusGuid = '${req.query.projectStatus}'`;
    }
    query += "order by P.Number";
    /*const query = `select Guid , Number,Description,dbo.[GetProjectLockedDate](Guid) as LockedTillDate
    from projects 
     where number  like 
    '%${searchTerm}%' or   description like '%${searchTerm}%'
    order by Number`;*/
    console.log(query);
    const result = await getConnection().query(query);
    res.json(result);
  };

  static GetProjectByGUID = async (request: Request, response: Response) => {
    const projectGuid = request.params.guid;
    const getProjectQuery: string = `select top 1 * from projects where Guid = '${projectGuid}'`;
    console.info("GetProjectByGUID", getProjectQuery);
    const result = await getConnection().query(getProjectQuery);
    response.json(result[0]);
  };

  static getProjectRolesByGuid = async (
    request: Request,
    response: Response
  ) => {
    const result = await getConnection().query(`
    select PR.Guid as roleGuid,
       R2.Code as description,
       PR.Rate as roleRate
from ProjectRoles PR
         inner join Roles R2 on PR.RoleGuid = R2.Guid
where ProjectGuid = '${request.params.guid}'
    `);
    response.json(result);
  };

  static getProjectExpense = async (request: Request, response: Response) => {
    const result = await getConnection().query(`
select *
from (select top 100000 FH.Guid,
                        FH.Description                            as description,
                        'project'                                 as type,
                        S.Name                                    as scopeName,
                        (select F.Guid                                       as guid,
                                F.Description                                as description,
                                'task'                                       as type,
                                S2.Name                                      as scopeName,
                                PT.Name                                      as payrollType,
                                (select A.ProjectRoleGuid as projectRoleGuid,
                                        A.EstimatedHours  as estimateHours,
                                        'allocation'      as type,
                                        PR.Rate           as roleRate
                                 from Allocations A
                                          left join ProjectRoles PR on A.ProjectRoleGuid = PR.Guid
                                 where A.FeatureGuid = F.Guid for json path) as 'Allocations'
                         from Features F
                                  left join Scopes S2 on F.ScopeGuid = S2.Guid
                                  left join PayrollTypes PT on F.PayrollTypeGuid = PT.Guid
                         where F.FeatureHeadingGuid = FH.Guid
                         order by F.SortOrder for json path) as 'childTasks'
      from FeatureHeadings FH
               left join Scopes S on FH.ScopeGuid = S.Guid
      where FH.ProjectGuid = '${request.params.guid}'
      order by FH.SortOrder) as data for json path
`);
    let resultKey = Object.keys(result[0])[0];
    let finalResult = result[0][resultKey].toString();
    response.json(JSON.parse(finalResult));
  };

  static GetAllProjectTypes = async (req: Request, res: Response) => {
    const q = `select * from ProjectTypes order by code`;
    const pts = await getConnection().query(q);
    res.json(pts);
  };

  static GetAllProjectStatuses = async (req: Request, res: Response) => {
    const q = `select * from Status order by code`;
    const ps = await getConnection().query(q);
    res.json(ps);
  };

  static Insert = async (req: Request, res: Response) => {
    try {
      const _repository = getRepository(Projects);
      let project = new Projects();
      Object.assign(project, req.body);

      if (!(project.Guid && project.Guid.length > 0)) {
        project.Guid = Guid.create()
          .toString()
          .toUpperCase();
        project.CreatedDate = new Date();
      }

      // let isDuplicate = await ProjectController.isDuplicateTimesheet(
      //   timeSheet
      // );
      // if (isDuplicate) {
      //   res.status(409).json({ message: "Timesheet already exist." });
      //   return;
      // }
      await _repository.save(project);
    } catch (e) {
      console.log(e);
      let msg = { Operation: "Insert", Exception: e };
      res.status(409).json(msg);
      return;
    }

    //If all ok, send 201 response
    res.status(201).json("Project created");
  };

  static Update = async (req: Request, res: Response) => {
    try {
      const _repository = getRepository(Projects);
      let project = new Projects();
      console.log(req.body);
      Object.assign(project, req.body);
      console.log(project);
      await _repository.save(project);
      res.status(200).json();
    } catch (e) {
      res.status(409).json("Exception when update timesheet" + e);
      return;
    }
  };
}
export default ProjectController;
