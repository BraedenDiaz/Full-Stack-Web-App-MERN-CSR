import express from "express";

/**
 * @author Braeden Diaz
 * 
 * Custom Router
 * 
 * Route: /logout
 * Methods: DELETE
 */

const logoutRouter = express.Router();

// Destroys the session if it exists on the request
logoutRouter.delete("/", (req, res, next) => {
    if (req.session)
    {
        req.session.destroy(err => {
            if (err)
            {
                res.status(400).send();
            }
            else
            {
                res.status(200).send();
            }
        });
    }
});

export default logoutRouter;