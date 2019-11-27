import { Document, Schema, Model, Types } from "mongoose"
import bcrypt from "bcrypt";
import uniqId from "uniqid";

import { db } from "../db"
import config from "../config";

/**
 * Model
 */
export type UserModel = Document & {

    name: string,
    email: string,
    email_verified: boolean,
    password: string,
    password_repeat: string,
    session: string,
    admin: boolean,
    lang: string,

    api: {
        token: string,
        expireAt: Date
    }

    validatePassword: (pwd: string) => Promise<boolean>,
    apiLogin: () => void
}

/**
 * Schema
 */
const userSchema = new Schema({
    name: String,
    email: String,
    email_verified: { type: Boolean, default: false },
    password: String,
    session: String,
    admin: Boolean,
    lang: { type: String, default: "en" },

    api: {
        token: String,
        expireAt: Date
    }
});

userSchema.pre("save", async function (next) {
    const user = this as UserModel;

    if (this.isNew || user.isModified("password")) {
        // Hash the password
        user.password = await bcrypt.hash(user.password, config.BCRYPT_SALT);
    }

    if (user.isModified("session") && user.session) {
        user.session = await bcrypt.hash(user.session, 1);
    }

    next();
});

userSchema.methods.validatePassword = async function (compare: string) {
    const user = this as UserModel;

    return await bcrypt.compare(compare, user.password)
}

userSchema.methods.apiLogin = async function () {
    const user = this as UserModel;

    let expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + 1);

    let token: string = user.api.token;

    if (!user.api.token || !user.api.expireAt || user.api.expireAt < new Date()) {
        token = Buffer.from(user._id + expireAt.getTime() + uniqId()).toString("base64");
    }

    user.api = { token, expireAt };

    await user.save();
}

const User = db.model("user", userSchema) as Model<Document> & UserModel;
export default User;