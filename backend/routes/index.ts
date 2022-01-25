import express from "express";

/**
 * @author Braeden Diaz
 *
 * Custom Router
 * 
 * Route: /
 * Methods: GET
 */

const indexRouter = express.Router();

// Handle GET requests to the root route and simply respont with
// whether there is a user (active session) or not.
indexRouter.get("/", (req, res, next) => {
    res.status(200).json({
        authenticated: req.session.authenticated,
        username: req.session.user?.username
    });
});

export default indexRouter;