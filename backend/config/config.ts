
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
export const SESSION_COOKIE_EXPIRATION : number = Number(process.env.SESSION_COOKIE_EXPIRATION) || 1000 * 60 * 60 * 24;
export const SESSION_COOKIE_SECURE : boolean = Boolean(process.env.SESSION_COOKIE_SECURE) || true;
export const SESSION_COOKIE_SAME_SITE : any  = process.env.SESSION_COOKIE_SAME_SITE || "strict";