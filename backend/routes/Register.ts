import express from "express";
import { hashAndSaltPassword } from "../helpers/authentication";
import { insertNewUser } from "../api/db";

/**
 * @author Braeden Diaz
 */

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res, next) => {

    const { body } = req;
    const { username, password } = body;
    const hashedPassword : string | null = await hashAndSaltPassword(password);
    let insertResult : any = null;

    console.log(`Received Username: ${username}`);
    console.log(`Received Password: ${password}`);
    
    console.log(`Hashed Password: ${hashedPassword}`);

    if (hashedPassword === null)
    {
        res.status(500).send();
        return;
    }
    
    try
    {
        insertResult = await insertNewUser(username, hashedPassword);

        res.status(201).json({
            username: insertResult.username
        });
    }
    catch (err)
    {
        res.status(200).json({
            error: err
        });
        return;
    }
});