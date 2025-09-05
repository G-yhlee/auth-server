import { Router } from "express";
import orm from "../../../lib/orm";

export const findAll = (router: Router) => {
  router.route("/infoNews/findAll").post(async (req, res) => {
    // const data = await orm.common.dto.infoGps.findAll(req.body);

    // res.json({ msg: "findAllInfoGps", data });
    res.status(201);
  });
  return router;
};
