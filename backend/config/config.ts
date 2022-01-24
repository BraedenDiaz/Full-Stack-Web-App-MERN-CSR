
/**
 * @author Braeden Diaz
 * 
 * Pull in environment variables for configuration and
 * set defaults as needed.
 * 
 * Note that we use the exclamation point (!) to force the types on environment variables
 * that must exist.
 */


// Web Server Configuration
export const WEB_SERVER_PORT : number = Number(process.env.WEB_SERVER_PORT) || 8080;

 // Front-End Configuration
 export const FRONT_END_HOST : string = process.env.FRONT_END_HOST || "http://localhost:3000";

// MongoDB Database Configuration

export const MONGODB_HOST : string = process.env.MONGODB_HOST!;
export const MONGODB_DB : string = process.env.MONGODB_DB!;

// Password Hashing and Salting Configuration

// Note: The bcrypt package does 2^SALT_ROUNDS iterations of processing
export const SALT_ROUNDS : number = Number(process.env.SALT_ROUNDS) || 10;

// Session Configuration
export const SESSION_SECRET : string = process.env.SESSION_SECRET!;

// Session Cookie Configuration
export const SESSION_COOKIE_DOMAIN : string = process.env.SESSION_COOKIE_DOMAIN || "localhost";
export const SESSION_COOKIE_PATH : string = process.env.SESSION_COOKIE_PATH || "/";
export const SESSION_COOKIE_EXPIRATION : number = Number(process.env.SESSION_COOKIE_EXPIRATION) || 1000 * 60 * 60 * 24;

export let SESSION_COOKIE_HTTP_ONLY : boolean = true;
// If the SESSION_COOKIE_HTTP_ONLY environment variable is not defined or is empty, use
// the default value which is already set to true. Otherwise, convert the value of the
// environment variable from a string, to a number, to a boolean, and use that.
if (process.env.SESSION_COOKIE_HTTP_ONLY !== undefined && process.env.SESSION_COOKIE_HTTP_ONLY !== "")
{
    SESSION_COOKIE_HTTP_ONLY = Boolean(Number(process.env.SESSION_COOKIE_HTTP_ONLY));
}

export let SESSION_COOKIE_SECURE : boolean = true;
// If the SESSION_COOKIE_SECURE environment variable is not defined or is empty, use
// the default value which is already set to true. Otherwise, convert the value of the
// environment variable from a string, to a number, to a boolean, and use that.
if (process.env.SESSION_COOKIE_SECURE !== undefined || process.env.SESSION_COOKIE_SECURE !== "")
{
    SESSION_COOKIE_SECURE = Boolean(Number(process.env.SESSION_COOKIE_SECURE));
}

export const SESSION_COOKIE_SAME_SITE : any  = process.env.SESSION_COOKIE_SAME_SITE || "strict";

// Based on the specification of cookie headers, if the same-site cookie header is "none",
// then the "secure" cookie header must be true for added security. Again, this only applies
// when the same-site cookie header is set to "none".
if (SESSION_COOKIE_SAME_SITE === "none" && SESSION_COOKIE_SECURE !== true)
{
    throw new Error("SESSION_COOKIE_SECURE must be true if SESSION_COOKIE_SAME_SITE is set to 'none'.");
}