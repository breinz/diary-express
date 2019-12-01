import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { UserModel } from "./UserModel";
import Event from "./EventModel";

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

eventCategorySchema.pre("remove", async function (next) {
    const category = this as EventCategoryModel;

    // TODO: Test if it works
    await Event.updateMany({ category: category._id }, { category: null });

    next();
})

const EventCategory = db.model("eventCategory", eventCategorySchema) as Model<Document> & EventCategoryModel;
export default EventCategory;