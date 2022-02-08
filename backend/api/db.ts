import User, {UserInterface} from "../models/Users";
import Forum, {ForumInterface} from "../models/Forums";
import Comment from "../models/Comments";

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

export async function insertNewForum(authorUsername : string, forumTitle : string, forumCategory : string, forumDescription : string)
{
    const user : (any | null) = await getUser(authorUsername);

    if (user === null)
    {
        throw "Insert New Forum Error: Author username does not exist.";
    }

    const newForum = new Forum({
        author: user._id,
        title: forumTitle,
        category: forumCategory,
        description: forumDescription
    });

    return await newForum.save();
}

export async function getForums()
{
    // Retrieves all forums from the database
    const forums = await Forum.find({}).populate("author", "username");

    return forums;
}

export async function getForumAuthor(forumID : string)
{
    const forum = await Forum.findById(forumID).populate<{author: UserInterface}>("author", "username");
    return forum.author.username;
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

////// CRUD Operations for the Specific Forum Page //////

export async function getForumByID(forumID : string)
{
    const forum = await Forum.findById(forumID).populate("author", "username").exec();
    return forum;
}

////// CRUD Operations for the Forum Comments //////

export async function insertNewComment(authorUsername : string, forumID : string, comment : string)
{
    const user : (any | null) = await getUser(authorUsername);
    const forum : (any | null) = await getForumByID(forumID);

    if (user === null)
    {
        throw "Insert New Comment Error: Author username does not exist.";
    }
    else if (forum === null)
    {
        throw "Insert New Comment Error: Forum does not exist."
    }

    const newComment = new Comment({
        author: user._id,
        forum: forum._id,
        comment: comment
    });

    return await newComment.save();
}

export async function getComments(forumID : string)
{
    const forum : (any | null) = await getForumByID(forumID);

    if (forum === null)
    {
        throw "Get Comments Error: Forum does not exist."
    }

    const forumComments = await Comment.find({ forum: forumID }).populate("author", "username").exec();

    return forumComments;
}

export async function getCommentAuthor(commentID : string)
{
    const comment = await Comment.findById(commentID).populate<{author: UserInterface}>("author", "username").exec();
    return comment.author.username;
}

export async function getCommentForumID(commentID : string)
{
    const comment = await Comment.findById(commentID, "forum").exec();

    if (comment === null)
    {
        throw "Get Comment Forum ID Error: Comment Not Found.";
    }

    return comment.forum.toString();
}

export async function deleteComment(commentID : string)
{
    const res = await Comment.findByIdAndDelete(commentID).exec();
    return res;
}

export async function deleteAllCommentsInForum(forumID : string)
{
    const forum : (any | null) = await getForumByID(forumID);

    if (forum === null)
    {
        throw "Delete All Comments Error: Forum does not exist."
    }

    const res = Comment.deleteMany({ forum: forumID });
    return res;
}