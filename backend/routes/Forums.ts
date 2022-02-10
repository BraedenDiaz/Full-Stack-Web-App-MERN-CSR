import express from "express";
import { deleteAllCommentsInForum, deleteComment, deleteForum, getCommentAuthor, getCommentForumID, getComments, getForumAuthor, getForumByID, getForums, insertNewComment, insertNewForum, updateComment, updateForum } from "../api/db";
import { isAuthenticated, isAuthorized } from "../helpers/authentication";
import { check, validationResult } from "express-validator";
import csurf from "csurf";

// Assign colors to a corresponding hex code to be used
// for forum categories.
enum CategoryColor
{
    blue = "#0d6efd",
    gray = "#6c757d",
    green = "#198754",
    aqua = "#0dcaf0",
    yellow = "#ffc107",
    red = "#dc3545",
    indigo = "#6610f2",
    purple = "#6f42c1",
    pink = "#d63384",
    orange = "#fd7e14",
    teal = "#20c997"
}

// Assign each forum category to a category color.
enum Category
{
    Animals = CategoryColor.orange,
    Cars = CategoryColor.yellow,
    Life = CategoryColor.pink,
    Nature = CategoryColor.green,
    Science = CategoryColor.purple,
    Technology = CategoryColor.aqua,
    VideoGames = CategoryColor.blue,
    Other = CategoryColor.gray
}

const forumsRouter = express.Router();

const csrfProtection = csurf();

forumsRouter.get("/", async (req, res, next) => {
    const forumsResult = await getForums();

    res.status(200).json(forumsResult);
});

// Helper function used to help index an enum with string values by its keys
// function enumKeys<O extends object, K extends keyof O = keyof O>(obj : O) : K[]
// {
//     return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
// }

forumsRouter.get("/categories", (req, res, next) => {
    res.status(200).json(Object.entries(Category));
});

forumsRouter.get("/create", csrfProtection, (req, res, next) => {
    res.status(200).json({
        csrfToken: req.csrfToken()
    });
});

forumsRouter.post("/create", csrfProtection, isAuthenticated, check("forumTitle")
                                                                .isAscii()
                                                                .withMessage("The forum title must use ASCII characters only.")
                                                                .stripLow()
                                                                .escape(),
                                                            check("forumCategory")
                                                                .isAscii()
                                                                .withMessage("Category must use ASCII characters only.")
                                                                .stripLow()
                                                                .escape(),
                                                            check("forumDescription")
                                                                .isAscii()
                                                                .withMessage("The forum description must use ASCII characters only.")
                                                                .stripLow()
                                                                .escape(),
                                                                async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { forumTitle, forumCategory, forumDescription } = req.body;

    try
    {
        await insertNewForum(req.session.user!.username, forumTitle, forumCategory, forumDescription);
        res.status(200).json({});
    }
    catch (err : any)
    {
        res.status(400).json({
            errors: [{
                msg: err
            }]
        });
    }
});

forumsRouter.delete("/:forumID", isAuthenticated, async (req, res, next) => {
    const forumID : string = req.params.forumID;
    const forumAuthor : string = await getForumAuthor(forumID);
    
    if (isAuthorized(forumAuthor, req, res, next))
    {
        await deleteAllCommentsInForum(forumID);
        await deleteForum(forumID);
        res.status(200).json({});
    }
    else
    {
        res.status(403).json({
            authenticated: false
        });
    }
});

forumsRouter.get("/:forumID", async (req, res, next) => {
    const forumID : string = req.params.forumID;

    try
    {
        const forumFromDatabase = await getForumByID(forumID);

        if (forumFromDatabase !== null)
        {
            res.status(200).json(forumFromDatabase);
        }
        else
        {
            res.status(404).json({});
        }
    }
    catch (err : any)
    {
        res.status(404).json({});
    }

});

// forumsRouter.get("/:forumID/edit", csrfProtection, (req, res, next) => {
//     res.status(200).json({
//         csrfToken: req.csrfToken()
//     });
// });

forumsRouter.put("/:forumID/edit", csrfProtection, isAuthenticated, check("forumTitle")
                                                                .isAscii()
                                                                .withMessage("The forum title must use ASCII characters only.")
                                                                .stripLow()
                                                                .escape(),
                                                            check("forumCategory")
                                                                .isAscii()
                                                                .withMessage("Category must use ASCII characters only.")
                                                                .stripLow()
                                                                .escape(),
                                                            check("forumDescription")
                                                                .isAscii()
                                                                .withMessage("The forum description must use ASCII characters only.")
                                                                .stripLow()
                                                                .escape(),
                                                                async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const forumID = req.params.forumID;
    const { forumTitle: newForumTitle, forumCategory: newForumCategory, forumDescription: newForumDescription } = req.body;
    const forumAuthor = await getForumAuthor(forumID);


    if (isAuthorized(forumAuthor, req, res, next))
    {
        try
        {
            await updateForum(forumID, newForumTitle, newForumCategory, newForumDescription);
            res.status(200).json({});
        }
        catch (err : any)
        {
            res.status(400).json({
                errors: [{
                    msg: err
                }]
            });
        }
    }
    else
    {
        res.status(403).json({
            authenticated: false
        });
    }

});

forumsRouter.get("/:forumID/comments", csrfProtection, async (req, res, next) => {
    const forumID : string = req.params.forumID;

    const commentsResult = await getComments(forumID);
    res.status(200).json({
        csrfToken: req.csrfToken(),
        result: commentsResult
    });
});

forumsRouter.post("/:forumID/comments", csrfProtection, isAuthenticated, check("comment")
                                                                        .isAscii()
                                                                        .withMessage("Your comment must not be empty.")
                                                                        .stripLow()
                                                                        .escape(),
                                                                        async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const forumID : string = req.params.forumID;
    const { comment } = req.body;

    try
    {
        await insertNewComment(req.session.user!.username, forumID, comment);
        res.status(200).json({});
    }
    catch (err : any)
    {
        res.status(400).json({
            errors: [{
                msg: err
            }]
        });
    }
});

forumsRouter.put("/:forumID/comments/:commentID", csrfProtection, isAuthenticated, check("comment")
                                                                                    .isAscii()
                                                                                    .withMessage("Your comment must not be empty.")
                                                                                    .stripLow()
                                                                                    .escape(),
                                                                                    async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const forumID : string = req.params.forumID;
    const commentID : string = req.params.commentID;
    const commentAuthor : string = await getCommentAuthor(commentID);
    const forumIDFromComment : string = await getCommentForumID(commentID);

    const { comment: newComment } = req.body;

    if (isAuthorized(commentAuthor, req, res, next) && forumIDFromComment === forumID)
    {
        try
        {
            await updateComment(commentID, newComment);
            res.status(200).json({});
        }
        catch (err : any)
        {
            res.status(400).json({
                errors: [{
                    msg: err
                }]
            });
        }
    }
    else
    {
        res.status(403).json({
            authenticated: false
        });
    }
});

forumsRouter.delete("/:forumID/comments", isAuthenticated, async (req, res, next) => {
    const forumID : string = req.params.forumID;
    const forumAuthor = await getForumAuthor(forumID);

    if (isAuthorized(forumAuthor, req, res, next))
    {
        await deleteAllCommentsInForum(forumID);
        res.status(200).json({});
    }
    else
    {
        res.status(403).json({
            authenticated: false
        });
    }
});

forumsRouter.delete("/:forumID/comments/:commentID", isAuthenticated, async (req, res, next) => {
    const forumID : string = req.params.forumID;
    const forumAuthor : string = await getForumAuthor(forumID);
    const commentID : string = req.params.commentID;
    const commentAuthor : string = await getCommentAuthor(commentID);
    const forumIDFromComment : string = await getCommentForumID(commentID);

    // Allow the user to delete their own comments or allow the forum author to delete any of the comments on their forum.
    // Also make sure that the comment being removed by a forum author does in-fact belong to their forum.
    if (isAuthorized(commentAuthor, req, res, next) || (isAuthorized(forumAuthor, req, res, next) && forumIDFromComment === forumID))
    {
        await deleteComment(commentID);
        res.status(200).json({});
    }
    else
    {
        res.status(403).json({
            authenticated: false
        });
    }
});

export default forumsRouter;