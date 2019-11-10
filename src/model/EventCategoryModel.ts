import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { UserModel } from "./UserModel";

/**
 * Model
 */
export type EventCategoryModel = Document & {
    name: string,
    icon: string,
    color: string,
    user: Types.ObjectId | string | UserModel,
    deleted: boolean
}

/**
 * Schema
 */
const eventCategorySchema = new Schema({
    name: String,
    icon: String,
    color: String,
    user: { type: Schema.Types.ObjectId, ref: "user" },
    deleted: { type: Boolean, default: false }
});

const EventCategory = db.model("eventCategory", eventCategorySchema) as Model<Document> & EventCategoryModel;
export default EventCategory;