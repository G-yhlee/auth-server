import { map, pipe, toArray } from "@fxts/core";
import { testConfigData } from "./testConfigData";
import { genTestData } from "./genTestData";

export const testGpsWorkerData = (time: number) =>
  pipe(
    testConfigData(time),
    map((d) => genTestData(d)),
    toArray
  ).flat();
