import mongoose, { Schema } from "mongoose";

export interface CommentsInterface {
    author: Schema.Types.ObjectId,
    forum: Schema.Types.ObjectId,
    comment: string
}

const commentsSchema = new mongoose.Schema<CommentsInterface>({
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    forum: { type: Schema.Types.ObjectId, required: true, ref: "Forum" },
    comment: { type: String, required: true}
});

const CommentsModel = mongoose.model<CommentsInterface>("Comments", commentsSchema);

export default CommentsModel;