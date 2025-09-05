import { points } from "../../../lib/data/sample";

export const testConfigData: (t_start: number) => testConfig[] = (
  t_start: number
) => [
  {
    iw_idx: "01036781111",
    p0: { x: points.p1_start.x, y: points.p1_start.y },
    p1: { x: points.p1_end.x, y: points.p1_end.y },
    t_start: t_start + 1,
    t_gap: 301 * 1000, // 9초
    count: 100,
    site_idx: "sgj4",
  },
  {
    iw_idx: "01036782222",
    p0: { x: points.p2_start.x, y: points.p2_start.y },
    p1: { x: points.p2_end.x, y: points.p2_end.y },
    t_start: t_start + 1000,
    t_gap: 301 * 1000, // 301초
    count: 100,
    site_idx: "sgj4",
  },
  {
    iw_idx: "01036783333",
    p0: { x: points.p3_start.x, y: points.p3_start.y },
    p1: { x: points.p3_end.x, y: points.p3_end.y },
    t_start: t_start + 3000,
    t_gap: 301 * 1000, // 9초
    count: 100,
    site_idx: "sgj4",
  },
];
