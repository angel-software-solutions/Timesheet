import {getConnection} from "typeorm";
import {Request, Response} from "express";

exports.getAllGroups = async (request: Request, response: Response) => {
    const query = "select * from Groups";
    const result = await getConnection().query(query);
    response.json(result);
};
