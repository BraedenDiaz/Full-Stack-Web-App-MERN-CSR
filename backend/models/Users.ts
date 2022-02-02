import mongoose, { Schema } from "mongoose";

/**
 * @author Braeden Diaz
 */

export interface UserInterface {
    username: string,
    password: string,
    forums: Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema<UserInterface>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    forums: [{type: Schema.Types.ObjectId, required: false, ref: "Forum"}]
});

const UserModel = mongoose.model<UserInterface>("User", userSchema);

export default UserModel;