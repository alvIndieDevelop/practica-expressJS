import { Router, Request, Response } from "express";
import { BilleteraController } from "../controllers/billeteraController";
import { IUser } from "../models/userSchema";

const router = Router();
const controller = new BilleteraController();

router.get("/findWalletByUserId", async (req: Request, res: Response) => {
  try {
    const param = req.query;
    const userId: string = param.userId as string;
    const response = await controller.findWalletByUserId(userId);
    res.send(response);
  } catch (error: any) {
    res.status(401).send(error.message);
  }
});

router.post("/addToWallet", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const user: Partial<IUser> = body;
    const amount: number = body.amount;

    const response = await controller.addToWallet(user, amount);
    res.send(response);
  } catch (error: any) {
    res.status(401).send(error.message);
  }
});

router.post("/pay", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { userId, amount } = body;
    const response = await controller.payProduct(userId, amount);
    res.send(response);
  } catch (error: any) {
    res.status(401).send(error.message);
  }
});

router.post("/confirmPayment", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { sessionId, token, userId, amount } = body;
    const response = await controller.confirmPayment({
      sessionId,
      token,
      userId,
      amount,
    });
    res.send(response);
  } catch (error: any) {
    res.status(401).send(error.message);
  }
});

export default router;
