import mongoose from "mongoose";

/**
 * @author Braeden Diaz
 */

const userSchema : mongoose.Schema = new mongoose.Schema({
    username: String,
    password: String
});

const User : mongoose.Model<any> = mongoose.model("User", userSchema);

export default User;