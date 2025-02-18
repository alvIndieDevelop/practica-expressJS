import express, { Router, Response, Request } from "express";

import api from "./api";
import user from "./user";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello",
  });
});

router.use("/api", api);
router.use("/api/user", user);

export default router;
