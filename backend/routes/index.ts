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
// Also send a CSRF token to be used
indexRouter.get("/", (req, res, next) => {
    res.status(200).json({
        authenticated: req.session.authenticated,
        csrfToken: req.csrfToken(),
        username: req.session.user?.username
    });
});

export default indexRouter;