"use strict";

import express from "express";
import { Request, Response } from "express";

import routesEnd from "./router";
import authRouter from "./auth";
import usersRouter from "./users";
import otpRouter from "./otp";
import { info } from "console";

const { infoNewsRouter, infoUsersRouter } = routesEnd;

export default {
  infoNewsRouter,
  infoUsersRouter,
  authRouter,
  usersRouter,
  otpRouter,
};
