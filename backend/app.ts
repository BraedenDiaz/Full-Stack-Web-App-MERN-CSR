import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import { indexRouter } from "./routes/index";
import { loginRouter } from "./routes/Login";
import { registerRouter } from "./routes/Register";

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

const mongoDBStore : MongoStore = MongoStore.create({
    // Reuse our Mongoose connection
    clientPromise: mongooseConnectionClientPromise,
    crypto: {
        secret: SESSION_SECRET
    }

});


app.use(cors({
    origin: FRONT_END_HOST,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(WEB_SERVER_PORT, () => {
    console.log(`Server listening on port ${WEB_SERVER_PORT}...`);
});