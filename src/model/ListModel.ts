import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { UserModel } from "./UserModel";

/**
 * Model
 */
export type ListModel = Document & {
    title: string,
    icon: string,
    color: string,
    user: Types.ObjectId | string | UserModel,
    items: [{
        title: string
    }]
}

/**
 * Schema
 */
const listSchema = new Schema({
    title: String,
    icon: String,
    color: String,
    user: { type: Schema.Types.ObjectId, ref: "user" },
    items: [
        {
            title: String
        }
    ]
});

const List = db.model("list", listSchema) as Model<Document> & ListModel;
export default List;