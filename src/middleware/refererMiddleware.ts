import { NextFunction, Request, Response } from "express";

class RefererMiddleware {

    public save(req: Request, res: Response, next: NextFunction) {
        res.cookie("referer", req.headers.referer);

        next();
    }

    public retrieve(req: Request, res: Response, next: NextFunction) {
        req.referer = req.cookies.referer;

        next();
    }

    public clear(req: Request, res: Response, next: NextFunction) {
        res.clearCookie("referer");

        next();
    }
}

const refererMiddleware = new RefererMiddleware();
export default refererMiddleware;