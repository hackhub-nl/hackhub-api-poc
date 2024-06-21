import express from "express";
import routes from "./routes";
import cors from "cors";
import deserializeUser from "./middleware/deserializeUser";
import config from "config";

const app: express.Application = express();
const clientUri: string = config.get<string>("clientUri");

const allowedOrigins = [clientUri];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());

app.use(deserializeUser);

routes(app);

export { app };
