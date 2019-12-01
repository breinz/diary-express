import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import People from "./PeopleModel";

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

countrySchema.pre("remove", async function (next) {
    const country = this as CountryModel;

    // Remove all people from this country
    await People.updateMany({ from: country._id }, { from: null });

    next();

});

const Country = db.model("country", countrySchema) as Model<Document> & CountryModel;
export default Country;