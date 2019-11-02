import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"

/**
 * Model
 */
export type PageModel = Document & {
    title: string,
    content: string,
    url: string,
    id: string,
    deleted: boolean
}

/**
 * Schema
 */
const pageSchema = new Schema({
    title: String,
    content: String,
    url: String,
    id: String,
    deleted: { type: Boolean, default: false }
});

const Page = db.model("page", pageSchema) as Model<Document> & PageModel;
export default Page;