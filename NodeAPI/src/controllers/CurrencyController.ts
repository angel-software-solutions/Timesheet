import { Request, Response } from "express";
import { getConnection } from "typeorm";

class CurrencyController {
  static GetAllCurrency = async (req: Request, res: Response) => {
    const query = `select * from Currencies order by Code `;
    const result = await getConnection().query(query);
    res.json(result);
  };
}
export default CurrencyController;
