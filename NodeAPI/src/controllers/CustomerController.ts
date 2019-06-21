import { Request, Response } from "express";
import { getRepository, getConnection, LessThanOrEqual } from "typeorm";
import { TS } from "typescript-linq/TS";
import { validate } from "class-validator";
import { Guid } from "guid-typescript";
import { NextFunction } from "connect";
import { parse } from "querystring";
import { testentity } from "../entity/TestEntity";
import { Utils } from "../helpers/Utils";
import { DateUtils } from "../../node_modules/typeorm/util/DateUtils";
import { Customers } from "../entity/Customers";

class CustomerController {
  static GetAllCustomer = async (req: Request, res: Response) => {
    const query = "select * from Customers order by ClientName";

    //const query = `select * from timesheets where guid='ADE5F3B7-77B3-CCAC-BF62-E75686A7B251'`;
    const result = await getConnection().query(query);
    res.json(result);
  };

  static Insert = async (req: Request, res: Response) => {
    let customer = new Customers();
    Object.assign(customer, req.body);
    if (!(customer.Guid && customer.Guid.length > 0)) {
      customer.Guid = Guid.create()
        .toString()
        .toUpperCase();

      customer.PaymentTerms = "Net 30 Days";
    }
    console.log(customer);
    const customerRepository = getRepository(Customers);
    try {
      await customerRepository.save(customer);
    } catch (e) {
      console.log(e);
      res.status(409).json("Error in create customer");
      return;
    }
    res.status(201).json("Customer created");
  };

  static Update = async (req: Request, res: Response) => {
    let customer = new Customers();
    Object.assign(customer, req.body);
    console.log(customer);
    const customerRepository = getRepository(Customers);
    try {
      await customerRepository.save(customer);
    } catch (e) {
      res.status(409).json("Error in create customer");
      return;
    }
    res.status(201).json("Customer updated");
  };
}
export default CustomerController;
