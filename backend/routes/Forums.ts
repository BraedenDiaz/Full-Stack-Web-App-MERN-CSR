import express from "express";
import { getForums, insertNewForum } from "../api/db";

enum Category
{
    Animals = "ANIMALS",
    Cars = "CARS",
    Life = "LIFE",
    Nature = "NATURE",
    Science = "SCIENCE",
    Technology = "TECHNOLOGY",
    VideoGames = "VIDEO_GAMES"
}

const forumsRouter = express.Router();

forumsRouter.get("/", async (req, res, next) => {
    const forumsResult = await getForums();

    res.status(200).json(forumsResult);
});

forumsRouter.get("/categories", (req, res, next) => {
    
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