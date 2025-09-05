import { pipe, toArray } from "@fxts/core";
import { genPointWith } from "../../../lib/functions/genPoints";

export const genTestData = (config: testConfig): pn40record[] => {
  const { iw_idx, p0, p1, t_start, t_gap, count, site_idx } = config;

  return pipe(
    genPointWith(config.p0, config.p1, config.count).map((d, i) => ({
      iw_idx,
      x: d.x,
      y: d.y,
      record_time: t_start + i * t_gap,
      target_index: "",
      isAllow: false,
      status: "",
      site_idx: site_idx,
    })),
    toArray
  );
};
