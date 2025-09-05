import { pipe } from "@fxts/core";
import express, { Request, Response, NextFunction } from "express";

import infoNews from "./infoNews";
import infoUsers from "./infoUsers";
import "express-async-errors";

const router = express.Router();

const infoNewsRouter = pipe(
  router,
  infoNews.findAll,
  infoNews.create,
  infoNews.createAll,
  infoNews.destroy
);
const infoUsersRouter = pipe(
  router,
  infoUsers.findAll,
  infoUsers.create,
  infoUsers.destroyAll,
  infoUsers.destroy,
  infoUsers.createAll,
  infoUsers.update
);

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).send({ error: "An error occurred", content: err });
};

infoNewsRouter.use(errorHandler);
infoUsersRouter.use(errorHandler);

export default {
  infoNewsRouter,
  infoUsersRouter,
};
