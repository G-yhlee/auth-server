import { Router } from "express";
import orm from "../../../lib/orm";

export const destroy = (router: Router) => {
  router.route("/infoUsers/destroy").post(async (req, res) => {
    // const data = await orm.common.dao.infoGps.destroy(req.body);

    // res.json({ msg: "destroy", data });
    res.status(201);
  });
  return router;
};
