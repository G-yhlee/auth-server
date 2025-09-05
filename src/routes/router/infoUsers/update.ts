import { Router } from "express";
import orm from "../../../lib/orm";

export const update = (router: Router) => {
  router.route("/infoMap/update").post(async (req, res) => {
    // const data = await orm.common.dao.infoMap.update(
    //   req.body ? req.body : dao.infoGps[0]
    // );

    // res.json({ msg: "update", data });
    res.status(201);
  });
  return router;
};
