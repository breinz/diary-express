import { Request, Response, NextFunction } from "express";

class StepMiddleware {

    /**
     * If we are quitting this form, to create another item and come back later to that form
     * - save formData in data
     * - save form url in referer
     * - redirect to the new form
     */
    public saveStep(req: Request, res: Response, next: NextFunction) {
        if (req.body.step) {

            res.cookie("step_" + req.body.stepName, {
                referer: req.headers.referer,
                data: req.body
            });

            return res.redirect(req.body.step);
        }

        next();
    }
}

const stepMiddleware = new StepMiddleware();
export default stepMiddleware;