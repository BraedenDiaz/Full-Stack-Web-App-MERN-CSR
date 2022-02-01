import mongoose from "mongoose";

/**
 * @author Braeden Diaz
 */

interface User {
    username: string,
    password: string
}

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;