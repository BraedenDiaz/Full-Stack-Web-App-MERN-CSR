import express from "express";

/**
 * @author Braeden Diaz
 */

export const indexRouter = express.Router();

indexRouter.get("/", (req, res, next) => {
    res.status(200);
    res.send("<h1>This is the home page!</h1>");
});