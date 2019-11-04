import { Request, Response, NextFunction } from "express";

class PeopleNoteController {

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("people/note/new");
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.people.note.push(req.body.content);

        await req.people.save();

        req.flash("success", req.t("people.note.flash.created"));

        res.redirect(req.referer);
    }

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("people/note/edit", {
            index: req.params.index
        });
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        req.people.note[parseInt(req.params.index)] = req.body.content;

        req.people.markModified("note");
        await req.people.save();

        req.flash("success", req.t("people.note.flash.edited"));

        res.redirect(req.referer);
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {
        req.people.note.splice(parseInt(req.params.index), 1);

        await req.people.save();

        req.flash("success", req.t("people.note.flash.deleted"));

        res.json({ success: true, redirect: req.headers.referer });
    }
}

const peopleNoteController = new PeopleNoteController();
export default peopleNoteController;