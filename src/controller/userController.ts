import { Request, Response, NextFunction } from "express";
import User from "../model/UserModel";

class UserController {
    public async emailTaken(req: Request, res: Response, next: NextFunction) {
        const user = await User.findOne({ email: req.body.email });
        return res.json({ taken: !!user });
    }
}

const userController = new UserController();
export default userController;