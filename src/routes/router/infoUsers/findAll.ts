import { Router } from "express";
import orm from "../../../lib/orm";

export const findAll = (router: Router) => {
  router.route("/infoMap/findAll").post(async (req, res) => {
    const data = await orm.common.dao.infoMap.findAll(req.body);

    res.json({ msg: "infoMap/findAll", data });
    res.status(201);
  });
  return router;
};
