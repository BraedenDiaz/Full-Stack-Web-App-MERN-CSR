import express from "express";
import { getForums, insertNewForum } from "../api/db";

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

forumsRouter.post("/create", async (req, res, next) => {
    const { forumTitle, forumCategory, forumDescription } = req.body;

    try
    {
        await insertNewForum(forumTitle, forumCategory, forumDescription);
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

export default forumsRouter;