import express from "express";
import bcrypt from "bcrypt";
import { CustomValidator } from "express-validator";
import { SALT_ROUNDS } from "../config/config";

/**
 * @author Braeden Diaz
 */

////// Password Hashing and Salting, and Authentication //////

export async function hashAndSaltPassword(password : string) : Promise<string | null>
{
    try
    {
        const salt : string = await bcrypt.genSalt(SALT_ROUNDS);
        const hash : string = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err)
    {
        console.log(err);
    }

    return null;
}

export async function authenticatePassword(password : string, hash : string) : Promise<boolean>
{
    try
    {
        const matchFound : boolean = await bcrypt.compare(password, hash);
        return matchFound;
    }
    catch (err)
    {
        console.log(err);
    }

    return false;
}

////// Custom Authentication Express Middleware //////

export const isAuthenticated = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    if (req.session.user && req.session.authenticated)
    {
        next();
    }
    else
    {
        res.status(403).json({
            authenticated: false
        });
    }
};

export const isAuthorized = (authorizedUser : string, req : express.Request, res : express.Response, next : express.NextFunction) => {
    if (req.session.user && req.session.user.username === authorizedUser)
    {
        return true;
    }

    return false;
};

////// Custom Validators for use with express-validator //////

export const hasNoSpaceCharacters : CustomValidator = (value : string) => {
    if (/\s/.test(value))
    {
        throw new Error("Space characters are not allowed.");
    }

    return true;
};

export const isNotEmpty : CustomValidator = (value : string) => {
    if (value === "")
    {
        throw new Error("Empty string is not allowed.")
    }

    return true;
};