import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import session from "express-session";
import csurf from "csurf";
import MongoStore from "connect-mongo";

import indexRouter  from "./routes/index";
import registerRouter  from "./routes/Register";
import loginRouter  from "./routes/Login";
import logoutRouter from "./routes/Logout";

import mongooseConnectionClientPromise from "./config/db";
import { WEB_SERVER_PORT,
        FRONT_END_HOST,
        SESSION_SECRET,
        SESSION_COOKIE_EXPIRATION,
        SESSION_COOKIE_SECURE,
        SESSION_COOKIE_SAME_SITE, 
        SESSION_COOKIE_DOMAIN,
        SESSION_COOKIE_PATH,
        SESSION_COOKIE_HTTP_ONLY} from "./config/config";


declare module "express-session" {
    export interface SessionData
    {
        authenticated: boolean,
        user: {
            username: string,
            password: string
        }
    }
    
};

/**
 * @author Braeden Diaz
 */

const app = express();

// Setup our MongoSB Store for use as our session store (see the session middleware)
const mongoDBStore : MongoStore = MongoStore.create({
    // Reuse our Mongoose connection
    clientPromise: mongooseConnectionClientPromise,
    crypto: {
        secret: SESSION_SECRET
    }

});

// Setup out third-party middlewares

app.use(cors({
    origin: FRONT_END_HOST,
    credentials: true
}));

// Sets various security-based HTTP headers to help protect against common
// attacks such as some Cross-Site-Scripting attacks.
app.use(helmet());

// Parse and urlencode the received HTTP body data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// For protecting against HTTP Parameter Pollution attacks
// This must be placed after the urlencoded body parsing
app.use(hpp());

// Setup our espress-session middleware and session cookie
app.use(session({
    secret: SESSION_SECRET,
    cookie: {
        domain: SESSION_COOKIE_DOMAIN,
        path: SESSION_COOKIE_PATH,
        httpOnly: SESSION_COOKIE_HTTP_ONLY,
        maxAge: SESSION_COOKIE_EXPIRATION,
        secure: SESSION_COOKIE_SECURE,
        sameSite: SESSION_COOKIE_SAME_SITE
    },
    store: mongoDBStore,
    resave: false,
    saveUninitialized: false
}));

// Setup our CSRF protection on all routes
// This is places after our express-session middleware which will
// be used by csurf to store our CSRF tokens.
app.use(csurf());

// Setup our router middlewares
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
    if (err.code === "EBADCSRFTOKEN")
    {
        res.status(403).json({
            errors: [{
                msg: "Invalid CSRF Token!"
            }]
        });
    }
    else
    {
        next();
    }
});

// Start the server
app.listen(WEB_SERVER_PORT, () => {
    console.log(`Server listening on port ${WEB_SERVER_PORT}...`);
});