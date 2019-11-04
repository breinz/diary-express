import { Request, Response, NextFunction } from "express";

/**
 * Home-made flash message
 * - adds flash method to req
 * - makes it available to views in `flash`
 */
class FlashMiddleware {

    public init(req: Request, res: Response, next: NextFunction) {
        // Add flash method to request
        req.flash = (type, message) => {
            if (req.session) {
                req.session.flash = req.session.flash || {};
                req.session.flash[type] = message;
            }
        }

        // Pass the flash message to res and delete it
        if (req.session && req.session.flash) {
            res.locals.flash = req.session.flash;
            res.locals.cache = false;
            delete req.session.flash;
        }

        next();
    }
}

export default new FlashMiddleware();