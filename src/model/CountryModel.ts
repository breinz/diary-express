import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { UserModel } from "./UserModel";

/**
 * Model
 */
export type CountryModel = Document & {
    name: string,
}

/**
 * Schema
 */
const countrySchema = new Schema({
    name: String,
});

const Country = db.model("country", countrySchema) as Model<Document> & CountryModel;
export default Country;