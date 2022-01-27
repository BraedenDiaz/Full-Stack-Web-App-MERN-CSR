import express from "express";
import csurf from "csurf";
import { check, validationResult } from "express-validator";
import { getUser } from "../api/db";
import { authenticatePassword, hasNoSpaceCharacters } from "../helpers/authentication";
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "../config/config";

/**
 * @author Braeden Diaz
 * 
 * Custom Router
 * 
 * Route: /login
 * Methods: POST
 */

const loginRouter = express.Router();

const csrfProtection = csurf();

loginRouter.get("/", csrfProtection, (req, res, next) => {
    res.status(200).json({
        csrfToken: req.csrfToken()
    });
});

// Handle the POST request for logging in a user
// We also use middleware to validate and santizie user input on this route as well
loginRouter.post("/", csrfProtection, check("username").custom(hasNoSpaceCharacters)
                                       .isAscii()
                                       .withMessage("Username must use ASCII characters only.")
                                       .stripLow()
                                       .escape(),
                    check("password").custom(hasNoSpaceCharacters)
                                       .isAscii()
                                       .withMessage("Username must use ASCII characters only.")
                                       .isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH})
                                       .withMessage(`Password must be a length between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`)
                                       .stripLow()
                                       .escape(),
                                       async (req, res, next) => {
    
    // Make sure all our input validations have passed, if not, send
    // an error response.
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // Retrieve, the provided username and password from the request.
    const { body } = req;
    const { username, password } = body;
    let passwordAuthenticated : boolean | null = null;

    // Get the user from the database
    const dbResult = await getUser(username);

    // If the user does not exist in the database, send an error response message
    if (dbResult === null)
    {
        res.status(400).json({
            errors: [{
                msg: "User Does not Exist"
            }]
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
        res.status(400).json({
            errors: [{
                msg: "Wrong Password"
            }]
        });
        return;
    }

});

export default loginRouter;