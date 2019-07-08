import {getConnection} from "typeorm";
import {Request, Response} from "express";

exports.getAllPayrollTypes = async (request: Request, response: Response) => {
    const query = "select * from PayrollTypes";
    const result = await getConnection().query(query);
    response.json(result);
};
