import User from "../models/Users";

/**
 * @author Braeden Diaz
 */

export async function getUser(username : string)
{
    const foundUser = await User.findOne({
        username: username
    }).exec();

    return foundUser;
}

export async function insertNewUser(username : string, hashedPassword : string) : Promise<any>
{
    const userExists : (any | null) = await getUser(username);

    if (userExists !== null)
    {
        throw "User Already Exists";
    }

    const newUser = new User({
        username: username,
        password: hashedPassword
    });

    return await newUser.save();
}

export async function updateUserProfile(username : string, newUsername : string, hashedPassword : string)
{
    const res = await User.updateOne({ username: username}, { username: newUsername, password: hashedPassword});

    if (!res.acknowledged)
    {
        throw "User Profile Update Failed.";
    }
}

export async function deleteUser(username : string)
{
    const res = await User.deleteOne({ username: username });

    if (!(res.deletedCount === 1))
    {
        throw "User Delete Failed";
    }
}