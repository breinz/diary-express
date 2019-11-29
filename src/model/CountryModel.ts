import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"

/**
 * Model
 */
export type CountryModel = Document & {
    name: string,
    user: Types.ObjectId | string
}

/**
 * Schema
 */
const countrySchema = new Schema({
    name: String,
    user: { type: Schema.Types.ObjectId, ref: "user" }
});

const Country = db.model("country", countrySchema) as Model<Document> & CountryModel;
export default Country;