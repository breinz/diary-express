import { Request, Response, NextFunction } from "express";

class ApiDateMiddleware {

    public getPeriod(req: Request, res: Response, next: NextFunction) {
        if (req.query.year) {

            const year = parseInt(req.query.year);

            if (req.query.month) {

                const month = parseInt(req.query.month);

                if (req.query.day) {

                    // DAY
                    const day = parseInt(req.query.day);

                    req.bop = new Date(year, month - 1, day);
                    req.eop = new Date(year, month - 1, day + 1);

                } else {

                    // MONTH
                    req.bop = new Date(year, month - 1, 1);
                    req.eop = new Date(year, month, 1);
                }

            } else {

                // YEAR
                req.bop = new Date(year, 0, 1);
                req.eop = new Date(year + 1, 0, 1);

            }

        } else {

            // CURRENT MONTH (default)
            req.bop = req.util.bom();
            req.eop = req.util.bonm();

        }

        req.bop.setMinutes(req.bop.getMinutes() - req.bop.getTimezoneOffset());
        req.eop.setMinutes(req.eop.getMinutes() - req.eop.getTimezoneOffset());

        next();
    }
}

const middleware = new ApiDateMiddleware();
export default middleware;