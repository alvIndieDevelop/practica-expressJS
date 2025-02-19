import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

const controller = new AuthController();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const response = await controller.login(body);
    res.send(response);
  } catch (error: any) {
    res.status(401).send(error.message);
  }
});
router.post("/register", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const response = await controller.register(body);
    res.send(response);
  } catch (error: any) {
    res.status(401).send(error.message);
  }
});

export default router;
