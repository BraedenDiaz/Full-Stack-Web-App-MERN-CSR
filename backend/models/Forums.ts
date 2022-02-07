import mongoose, { Schema } from "mongoose";

export interface ForumInterface {
    author: Schema.Types.ObjectId,
    title: string,
    category: string,
    description?: string
}

const forumSchema = new mongoose.Schema<ForumInterface>({
    author: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: String
});

const ForumModel = mongoose.model<ForumInterface>("Forum", forumSchema);

export default ForumModel;