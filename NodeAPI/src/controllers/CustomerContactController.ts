import { Request, Response } from "express";
import { getConnection } from "typeorm";

class CustomerContactController {
  static GetCustomerContacts = async (req: Request, res: Response) => {
    const customerGuid = req.params.customerGuid;
    console.log(customerGuid);
    const query = `select * from CustomerContacts 
    where CustomerGuid='${customerGuid}'     order by FirstName`;
    const customerContacts = await getConnection().query(query);

    res.json(customerContacts);
  };
}
export default CustomerContactController;
