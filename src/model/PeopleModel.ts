import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { UserModel } from "./UserModel";
import { CountryModel } from "./CountryModel";

/**
 * Model
 */
export type PeopleModel = Document & {
    firstName: string,
    lastName: string,
    sexe: boolean,
    age: number,
    metIn: string,
    met_at: Date,
    user: Types.ObjectId | string | UserModel,
    from: Types.ObjectId | string | CountryModel,
    note: [string],
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
    met_at: Date,
    user: { type: Schema.Types.ObjectId, ref: "user" },
    from: { type: Schema.Types.ObjectId, ref: "country" },
    note: [String],
    deleted: { type: Boolean, default: false }
});

const People = db.model("people", peopleSchema) as Model<Document> & PeopleModel;
export default People;