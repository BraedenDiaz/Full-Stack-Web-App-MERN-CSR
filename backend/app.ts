import express from "express";
import cors from "cors";
import { indexRouter } from "./routes/index";
import { loginRouter } from "./routes/Login";
import { registerRouter } from "./routes/Register";

/**
 * @author Braeden Diaz
 */

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(8080, () => {
    console.log(`Server listening on port 8080...`);
});