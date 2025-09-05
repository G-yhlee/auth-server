import { Router } from "express";
import { auth } from "../../lib/auth";
import { toNodeHandler } from "better-auth/node";

const authRouter = Router();

authRouter.all("/auth/*", toNodeHandler(auth));

export default authRouter;