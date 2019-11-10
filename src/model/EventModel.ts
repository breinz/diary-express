import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { EventCategoryModel } from "./EventCategoryModel";
import { UserModel } from "./UserModel";

/**
 * Model
 */
export type EventModel = Document & {
    date: Date,
    category: Types.ObjectId | string | EventCategoryModel,
    title: string,
    description: string,
    user: Types.ObjectId | string | UserModel,
    deleted: boolean
}

/**
 * Schema
 */
const eventSchema = new Schema({
    date: Date,
    category: { type: Schema.Types.ObjectId, ref: "eventCategory" },
    title: String,
    description: String,
    user: { type: Schema.Types.ObjectId, ref: "user" },
    deleted: { type: Boolean, default: false }
});

const Event = db.model("event", eventSchema) as Model<Document> & EventModel;
export default Event;