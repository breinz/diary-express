import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { UserModel } from "./UserModel";

/**
 * Model
 */
export type PeopleModel = Document & {
    firstName: string,
    lastName: string,
    sexe: boolean,
    age: number,
    metIn: string,
    user: Types.ObjectId | string | UserModel,
    deleted: boolean
}

/**
 * Schema
 */
const peopleSchema = new Schema({
    firstName: String,
    lastName: String,
    sexe: Boolean,
    age: Number,
    metIn: String,
    user: { type: Schema.Types.ObjectId, ref: "user" },
    deleted: { type: Boolean, default: false }
});

const People = db.model("people", peopleSchema) as Model<Document> & PeopleModel;
export default People;