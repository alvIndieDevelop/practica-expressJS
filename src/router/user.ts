import { Router, Request, Response } from "express";
import { IUserRepository, IUserService, IUser } from "../types/userTypes";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userServices";

const router = Router();

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

router.get("/", async (_req: Request, res: Response) => {
  const users: IUser[] = await userService.findAll();
  res.status(200).json(users);
});

router.get("/:id", async (req: Request, res: Response) => {
  const user: IUser = await userService.findById(req.params.id);
  res.status(200).json(user);
});

router.post("/", async (req: Request, res: Response) => {
  const user: IUser = await userService.create(req.body);
  res.status(201).json(user);
});

router.put("/:id", async (req: Request, res: Response) => {
  const user: IUser = await userService.update(req.body);
  res.status(200).json(user);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await userService.delete(req.params.id);
  res.status(204).json();
});

export default router;
