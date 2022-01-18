import express from "express";
import { indexRouter } from "./routes/index";

/**
 * @author Braeden Diaz
 */

const app = express();

app.use("/", indexRouter);

app.listen(8080, () => {
    console.log(`Server listening on port 8080...`);
});