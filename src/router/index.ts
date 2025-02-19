import express, { Router, Response, Request } from "express";

import api from "./api";
import user from "./user";
import auth from "./auth";
import wallet from "./wallet";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello",
  });
});

router.use("/api", api);
router.use("/api/user", user);
router.use("/api/auth", auth);
router.use("/api/wallet", wallet);

export default router;
