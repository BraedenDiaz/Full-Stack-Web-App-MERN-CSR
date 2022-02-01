import User from "../models/Users";
import Forum from "../models/Forums";

/**
 * @author Braeden Diaz
 */


////// CRUD Operations for Users //////

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

export async function getUser(username : string)
{
    const foundUser = await User.findOne({
        username: username
    }).exec();

    return foundUser;
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

////// CRUD Operations for Forums //////

export async function insertNewForum(forumTitle : string, forumCategory : string, forumDescription : string)
{
    const newForum = new Forum({
        title: forumTitle,
        category: forumCategory,
        description: forumDescription
    });

    return await newForum.save();
}

export async function getForums()
{
    // Retrieves all forums from the database
    const forums = await Forum.find({});

    return forums;
}

export async function updateForum(forumID : string, newTitle : string, newCategory : string, newDescription : string)
{
    const res = await Forum.findByIdAndUpdate(forumID, {
        title: newTitle,
        category: newCategory,
        description: newDescription
    }).exec();

    return res;
}

export async function deleteForum(forumID : string)
{
    const res = await Forum.findByIdAndDelete(forumID).exec();

    return res;
}