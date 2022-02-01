import mongoose from "mongoose";

interface Forum {
    title: string;
    category: string;
    description?: string;
}

const forumSchema = new mongoose.Schema<Forum>({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: String
});

const ForumModel = mongoose.model<Forum>("Forum", forumSchema);

export default ForumModel;