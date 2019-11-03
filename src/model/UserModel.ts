import { Document, Schema, Model, Types } from "mongoose"
import bcrypt from "bcrypt";

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

    validatePassword: (pwd: string) => Promise<boolean>
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
    lang: String,
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

const User = db.model("user", userSchema) as Model<Document> & UserModel;
export default User;