import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { createServer } from "http";

import helmet from "helmet";
import router from "./routes";
import "express-async-errors";
const corsOptions = {
  origin: [],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
const app: Express = express();
const port = process.env.PORT || 3333;

const server = createServer(app);
app.use(helmet());
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", router.infoUsersRouter);
app.use("/api", router.infoNewsRouter);

server.listen(port, () => {
  console.info(`listen at ${port}`);
});
