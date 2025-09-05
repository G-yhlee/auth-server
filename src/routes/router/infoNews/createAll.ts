import { Router } from "express";

import orm from "../../../lib/orm";

export const createAll = (router: Router) => {
  router.route("/infoNews/createAll").post(async (req, res) => {
    // const data = await orm.newsApp.dao.infoNews.createAll(
    //   req.body ? req.body : dao.infoNews
    // );

    // res.json({ msg: "create", data });
    res.status(201);
  });
  return router;
};
