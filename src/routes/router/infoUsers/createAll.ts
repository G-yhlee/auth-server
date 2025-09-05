import { Router } from "express";

import orm from "../../../lib/orm";

export const createAll = (router: Router) => {
  router.route("/infoUsers/createAll").post(async (req, res) => {
    // const data = await orm.common.dao.infoMap.createAll(
    //   req.body.length ? req.body : dao.infoGps
    // );

    // res.json({ msg: "create", data });
    res.status(201);
  });
  return router;
};
