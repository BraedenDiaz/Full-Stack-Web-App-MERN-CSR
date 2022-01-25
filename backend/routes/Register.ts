import express from "express";
import { hashAndSaltPassword } from "../helpers/authentication";
import { insertNewUser } from "../api/db";

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
registerRouter.post("/", async (req, res, next) => {

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