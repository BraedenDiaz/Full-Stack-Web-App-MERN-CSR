import express from "express";
import { check, validationResult } from "express-validator";
import { hashAndSaltPassword, hasNoSpaceCharacters } from "../helpers/authentication";
import { insertNewUser } from "../api/db";
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "../config/config";

/**
 * @author Braeden Diaz
 * 
 * Custom Router
 * 
 * Route: /register
 * Methods: POST
 */

const registerRouter = express.Router();


// Handle POST requests for registering a new user
// We also use middleware to validate and santizie user input on this route as well
registerRouter.post("/", check("username").custom(hasNoSpaceCharacters) // Make sure the input has no space characters
                                         .isAscii()                     // Make sure the input has only ASCII characters
                                         .withMessage("Username must use ASCII characters only.")
                                         .stripLow()                    // Strip all the control-based ASCII characters
                                         .escape(),                     // Replace special characters with HTML encodings
                        check("password").custom(hasNoSpaceCharacters)
                                        .isAscii()
                                        .withMessage("Username must use ASCII characters only.")
                                        // Make sure the password satisfies the length requirements
                                        .isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })
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
    // Hash and salt the password.
    const { body } = req;
    const { username, password } = body;
    const hashedPassword : string | null = await hashAndSaltPassword(password);
    let insertResult : any = null;

    // If the hash and salting of the password failed, return an internal server error response
    if (hashedPassword === null)
    {
        res.status(500).send();
        return;
    }
    
    try
    {
        // Attempt to insert a new user into the database
        insertResult = await insertNewUser(username, hashedPassword);

        res.status(201).json({
            username: insertResult.username
        });
    }
    catch (err : any)
    {
        // Send an error response message if the insertion failed.
        // This typically happens if a user already exists.
        res.status(200).json({
            error: err.message
        });
        return;
    }
});

export default registerRouter;