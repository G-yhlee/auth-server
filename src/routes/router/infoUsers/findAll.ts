import { Router } from "express";
import orm from "../../../lib/orm";

export const findAll = (router: Router) => {
  router.route("/infoUsers/findAll").post(async (req, res) => {
    // const data = await orm.common.dao.infoUsers.findAll(req.body);

    res.json({ msg: "infoUsers/findAll" });
    res.status(201);
  });
  return router;
};
