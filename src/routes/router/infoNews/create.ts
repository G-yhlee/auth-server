import { Router } from "express";
import orm from "../../../lib/orm";

export const create = (router: Router) => {
  router.route("/infoNews/create").post(async (req, res) => {
    // const data = await orm.newsApp.dto.

    res.json({ msg: "create" });
    res.status(201);
  });
  return router;
};
