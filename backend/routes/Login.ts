import express from "express";
import { getUser } from "../api/db";
import { authenticatePassword } from "../helpers/authentication";

/**
 * @author Braeden Diaz
 * 
 * Custom Router
 * 
 * Route: /login
 * Methods: POST
 */

const loginRouter = express.Router();

// Handle the POST request for logging in a user
loginRouter.post("/", async (req, res, next) => {

    // Retrieve, the provided username and password from the request.
    const { body } = req;
    const { username, password } = body;
    let passwordAuthenticated : boolean | null = null;

    // Get the user from the database
    const dbResult = await getUser(username);

    // If the user does not exist in the database, send an error response message
    if (dbResult === null)
    {
        res.status(200).json({
            error: "User Does not Exist"
        });
        return;
    }

    // Authenticate the provided password with the salted and hashed one from the database
    passwordAuthenticated = await authenticatePassword(password, dbResult.password);

    // If the password was successfully authenticated
    if (passwordAuthenticated)
    {
        // Set new properties on the session containing authentication status and user information
        req.session.authenticated = true;
        req.session.user = {
            username: username,
            password: password
        };
      
        // Send a response message containing only the authentication status and username of the now logged in user
        res.status(200).json({
            authenticated: req.session.authenticated,
            username: req.session.user.username
        });
    }
    else
    {
        // If the password was not successfully authenticated, send a response message stating so
        res.status(200).json({
            error: "Wrong Password"
        });
        return;
    }

});

export default loginRouter;