import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
});

// class App {
//   public app: Application;
//   private clientUri: string = config.get<string>("clientUri");

//   constructor() {
//     this.app = express();
//     this.databaseSync();
//     this.plugins();
//     this.routes();
//   }

//   protected plugins(): void {
//     this.app.use(
//       cors({
//         origin: this.clientUri,
//         credentials: true,
//       })
//     );
//     this.app.use(express.json());
//     this.app.use(express.urlencoded({ extended: true }));
//   }

//   protected databaseSync(): void {
//     const db = new Database();
//     db.sequelize?.sync();
//   }

//   protected routes(): void {
//     this.app.route("/").get((req: Request, res: Response) => {
//       res.send("Home route");
//     });
//     this.app.use("/api/v1/hackerspaces", HackerspaceRouter);
//     this.app.use("/api/v1/events", EventRouter);
//     this.app.use("/api/v1/auth", AuthenticationRouter);
//   }
// }

// const host = config.get<string>("host");
// const port = config.get<number>("port");
// const app = new App().app;

// app.listen(port, async () => {
//   logger.info(`App is running at http://${host}:${port}`);
// });
