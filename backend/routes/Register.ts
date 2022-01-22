import express from "express";

export const registerRouter = express.Router();

registerRouter.post("/", (req, res, next) => {

    const { body } = req;
    const { username, password } = body;

    console.log(`Received Username: ${username}`);
    console.log(`Received Password: ${password}`);
    const resObj = {
        successful: true
    };

    res.status(200);
    res.send(JSON.stringify(resObj));

});