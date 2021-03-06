import csurf from "csurf";
import express from "express";
import validator from "validator";
import { check, validationResult } from "express-validator";
import { deleteUser, updateUserProfile } from "../api/db";
import { MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH } from "../config/config";
import { hashAndSaltPassword, hasNoSpaceCharacters, isAuthenticated, isAuthorized } from "../helpers/authentication";

const usersRouter = express.Router();

const csrfProtection = csurf();

// Never return all users
usersRouter.get("/", (req, res, next) => {
    res.status(403).json({});
});

usersRouter.get("/:username", csrfProtection, isAuthenticated, (req, res, next) => {
    const username = req.params.username;;

    if (isAuthorized(username, req, res, next))
    {
        res.status(200).json({
            authenticated: req.session.authenticated,
            username: validator.unescape(req.session.user!.username),
            password: validator.unescape(req.session.user!.password),
            csrfToken: req.csrfToken()
        });
    }
    else
    {
        res.status(403).json({});
    }
});

usersRouter.put("/:username", csrfProtection, isAuthenticated, check("newUsername")
                                                 .custom(hasNoSpaceCharacters)
                                                 .withMessage("Password must not have any spaces.")
                                                 .isAscii()
                                                 .withMessage("Username must use ASCII characters only.")
                                                 .isLength({ max: MAX_USERNAME_LENGTH })
                                                 .withMessage(`Username can only be a max length of ${MAX_USERNAME_LENGTH} characters.`)
                                                 .stripLow()
                                                 .escape(),
                                                check("newPassword")
                                                 .custom(hasNoSpaceCharacters)
                                                 .withMessage("Password must not have any spaces.")
                                                 .isAscii()
                                                 .withMessage("Username must use ASCII characters only.")
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

    const username = req.params.username;

    if (isAuthorized(username, req, res, next))
    {
        const { newUsername, newPassword } = req.body;
        const hashedPassword : string | null = await hashAndSaltPassword(newPassword);
    
        // If the hash and salting of the password failed, return an internal server error response
        if (hashedPassword === null)
        {
            res.status(500).send();
            return;
        }
    
        try
        {
            await updateUserProfile(username, newUsername, hashedPassword);
            req.session.user!.username = newUsername;
            req.session.user!.password = newPassword;
            res.status(200).json({});
        }
        catch (err : any)
        {
            res.status(400).json({
                errors: [{
                    msg: err
                }]
            });
        }
    }
    else
    {
        res.status(403).json({});
    }
});

usersRouter.delete("/:username", isAuthenticated, async (req, res, next) => {
    const username = req.params.username;

    if (isAuthorized(username, req, res, next))
    {
        try
        {
            
            await deleteUser(username);
            req.session.destroy(err => {
                if (err)
                {
                    console.log("User Account Delete Session Destroy Error:");
                    console.log(err);
                }
                res.status(200).json({});
            });
        }
        catch (err : any)
        {
            res.status(400).json({
                errors: [{
                    msg: err
                }]
            });
        }
    }
    else
    {
        res.status(403).json({});
    }
});

export default usersRouter;