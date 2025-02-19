import { IUser, UserModel } from "../models/userSchema";
import { UserController } from "./userController";
import TokenService from "../config/jwt";

type T_loginPayload = {
  email: string;
  password: string;
};

export class AuthController {
  async login(payload: T_loginPayload) {
    try {
      const userToFind = await UserModel.findOne({ email: payload.email });
      if (!userToFind) throw new Error("Invalid credentials");
      const isPassMatch = await userToFind.comparePassword(payload.password);
      if (!isPassMatch) throw new Error("Invalid credentials");
      // create the token
      const token = TokenService.createToken(userToFind);
      const user = await UserModel.findOne(
        { email: payload.email },
        { password: 0 }
      );

      return { user, token };
    } catch (error: any) {
      throw new Error(`Error login in: ${error.message}`);
    }
  }

  async register(payload: Partial<IUser>) {
    try {
      const userController = new UserController();
      await userController.create(payload);
      return {
        message: "user created",
      };
    } catch (error: any) {
      throw new Error(`Error en register: ${error.message}`);
    }
  }
}
