import { Router, Request, Response } from "express";
import { UserController } from "./../controllers/userController";

const router = Router();
const controller = new UserController();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const response = await controller.find();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const response = await controller.findOne(req.params.id);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const response = await controller.create(req.body);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const response = await controller.update(req.params.id, req.body);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const response = await controller.delete(req.params.id);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
