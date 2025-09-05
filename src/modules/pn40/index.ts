import { Request, Response } from "express";
import { sampleReqBody, sampleResBody } from "../../lib/data/sample";
import { log, log2 } from "../../lib/functions";
import { genTestData } from "./utils/genTestData";
import { map, pipe, toArray } from "@fxts/core";
import { pn40RecordToPn40 } from "./utils/pn40RecordToPn40";

export const pn40 = async (req: Request, res: Response) => {
  console.log({ msg: "pn40", data: req.body.payload });

  const configs: testConfig[] = req.body.payload || [
    {
      iw_idx: "01036782222",
      p0: { x: 127.148875, y: 37.6132 },
      p1: { x: 127.149975, y: 37.6142 },
      t_start: new Date().getTime() + 1000,
      t_gap: 301 * 1000, // 301초
      count: 3,
      site_idx: "sgj4",
    } as testConfig,
  ];

  const samplePn40 = pipe(
    configs,
    map(genTestData),
    map((d) => d.map((d) => pn40RecordToPn40(d))),
    toArray
  ).flat();

  const fetching = samplePn40.forEach(async (d) => {
    fetch(`http://${req.body.config.ip}:${req.body.config.port}/amons_tm`, {
      method: "POST",
      body: JSON.stringify(d),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  return {
    config: req.body.config,
    samplePn40,
  };
};
