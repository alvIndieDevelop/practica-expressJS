import express, { Router, Response, Request } from "express";

import api from "./api";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello",
  });
});

router.use("/api", api);

export default router;
