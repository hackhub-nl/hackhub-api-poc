import express from "express";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app: express.Application = express();

app.use(express.json());

app.use(deserializeUser);

routes(app);

export { app };
