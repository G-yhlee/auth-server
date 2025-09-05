import { Router } from "express";
import orm from "../../../lib/orm";

export const destroy = (router: Router) => {
  router.route("/infoUsers/destroy").post(async (req, res) => {
    // const data = await orm.common.dao.infoMap.destroy(req.body);

    // res.json({ msg: "destroy infoMap", data });
    res.status(201);
  });
  return router;
};
