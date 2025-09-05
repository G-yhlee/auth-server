"use strict";

import express from "express";
import { Request, Response } from "express";

import routesEnd from "./router";
import { info } from "console";

const { infoNewsRouter, infoUsersRouter } = routesEnd;

export default {
  infoNewsRouter,
  infoUsersRouter,
};
