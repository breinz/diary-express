import { Request, Response, NextFunction } from "express";
const mailer = require("pug-mailer");

class ApiContactController {
    public async post(req: Request, res: Response, next: NextFunction) {

        let d = new Date();
        //d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        let date = d.toLocaleDateString('en-US', {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
            hour: "2-digit", minute: "2-digit"
        });

        try {

            await mailer.send({
                from: "diary@julien-breiner.com",
                to: "julien.breiner@gmail.com",
                subject: "Message from Diary",
                template: "test",
                data: { ...req.body, date }
            });
        } catch (error) {
            console.log("Error");
            console.log(error);
            return res.status(503).json({ ok: false });

        }
        return res.json({});
    }
}

const controller = new ApiContactController();
export default controller;