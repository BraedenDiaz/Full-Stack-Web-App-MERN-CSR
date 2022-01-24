import express from "express";

/**
 * @author Braeden Diaz
 */

export const indexRouter = express.Router();

indexRouter.get("/", (req, res, next) => {
    res.status(200).json({
        authenticated: req.session.authenticated,
        username: req.session.user?.username
    });
});