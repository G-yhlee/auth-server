import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import { genSocketServer } from "./lib/socket";

import helmet from "helmet";
import router from "./routes";
import "express-async-errors";
const corsOptions = {
  origin: [
    "https://amons2.co.kr:9011",
    "http://localhost:5173",
    "http://localhost:3333",
    "http://localhost:3000",
    /^https:\/\/amons-location-system/,
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
const app: Express = express();
const port = process.env.PORT || 9100;

const server = createServer(app);
app.use(helmet());
app.use(cors(corsOptions));

// generate 이후, release
genSocketServer(server);

console.log("hello");

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/", router.amons_tm);
app.use("/store", router.commonInfoWorkerStoreRouter);

app.use("/api", router.infoGpsRouter);
app.use("/api", router.infoMapRouter);
app.use("/api", router.logGpsRouter);
// app.use("/store", router.commonInfoWorkerStoreRouter);

server.listen(port, () => {
  console.info(`listen at ${port}`);
});
