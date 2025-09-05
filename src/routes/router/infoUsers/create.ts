import { Router } from "express";
import orm from "../../../lib/orm";

export const create = (router: Router) => {
  router.route("/infoUsers/create").post(async (req, res) => {
    // const data = await orm.common.dao.infoMap.create(
    //   req.body ? req.body : dao.infoGps[0]
    // );

    // res.json({ msg: "create", data });
    res.status(201);
  });
  return router;
};
