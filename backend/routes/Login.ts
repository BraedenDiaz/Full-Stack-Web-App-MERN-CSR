import express from "express";
import { getUser } from "../api/db";
import { authenticatePassword } from "../helpers/authentication";

/**
 * @author Braeden Diaz
 */

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
    const { body } = req;
    const { username, password } = body;
    let passwordAuthenticated : boolean | null = null;

    const dbResult = await getUser(username);

    console.log("Login Result:");
    console.log(dbResult);

    if (dbResult === null)
    {
        res.status(200).json({
            error: "User Does not Exist"
        });
    }

    passwordAuthenticated = await authenticatePassword(password, dbResult.password);

    if (passwordAuthenticated)
    {
        req.session.authenticated = true;
        req.session.user = {
            username: username,
            password: password
        };
        console.log("Session:");
        console.log(req.session);
        res.status(200).send(JSON.stringify({
            redirect: "/",
            authenticated: req.session.authenticated,
            username: req.session.user.username
        }));
    }
    else
    {
        res.status(200).json({
            error: "Wrong Password"
        });
    }


});