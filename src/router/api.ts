import express, { Router, Response, Request } from "express";

import ApiController from "../controllers/apiController";

const api = Router();

api.get("/ping", async (_req, res) => {
  const controller = new ApiController();
  const response = await controller.ping();
  res.status(200).json(response);
});

export default api;
