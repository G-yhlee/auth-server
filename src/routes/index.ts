"use strict";

import express from "express";
import { Request, Response } from "express";

import { pnModules } from "../modules";
import { getPn } from "../lib/utils";
import routesEnd from "./router";

const {
  infoGpsRouter,
  infoMapRouter,
  logGpsRouter,
  commonInfoWorkerStoreRouter,
} = routesEnd;

const amons_tm = express.Router();

amons_tm.post("/amons_tm", async (req: Request, res: Response) => {
  const resBody = pnModules[`pn${getPn(req)}`](req, res);

  const resBodyJson = resBody instanceof Promise ? await resBody : resBody;
  // if resBody is promise return await value or return

  res.json(resBodyJson);

  // 번호별로 로깅작업 진행
  if (
    ["pn20", "pn31", "pn30", "pn31", "pn40", "pn50", "pn55", "pn60"]
      .filter((d) => d !== "pn40")
      .includes(`pn${getPn(req)}`)
  ) {
    console.log({ req: req.body, res: resBodyJson });
  }
  // res.json(pnModules[`pn40`](req, res));
});

export default {
  amons_tm,
  infoGpsRouter,
  infoMapRouter,
  logGpsRouter,
  commonInfoWorkerStoreRouter,
};
