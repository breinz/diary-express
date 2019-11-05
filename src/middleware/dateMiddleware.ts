import { Request, Response, NextFunction } from "express";

class DateMiddleware {

    /**
     * Get a period 
     * - from an url xxxx/2019-10 => 2019/10/01 to 2019/10/31 (selected month)
     * - from an url xxxx/2019 => 2019/01/01 to 2019/12/31 (selected year)
     * - from an url xxxx => current month
     * The url must catch :year [and :month]
     */
    public getPeriod(req: Request, res: Response, next: NextFunction) {
        if (req.params.year) {

            const year = parseInt(req.params.year);

            if (req.params.month) {

                const month = parseInt(req.params.month);

                req.bop = new Date(year, month - 1, 1);
                req.eop = new Date(year, month, 1);

            } else {

                req.bop = new Date(year, 0, 1);
                req.eop = new Date(year + 1, 0, 1);

            }

        } else {

            req.bop = req.util.bom();
            req.eop = req.util.bonm();

        }

        next();
    }
}

const dateMiddleware = new DateMiddleware();
export default dateMiddleware;