import { UserModel, IUser } from "../models/userSchema";
import { BilleteraController } from "./billeteraController";

export class UserController {
  async find() {
    return await UserModel.find().exec();
  }
  async findOne(id: string) {
    return await UserModel.findById(id).exec();
  }
  async create(data: Partial<IUser>) {
    // find user if exit
    const userToFind = await UserModel.findOne({ email: data.email });

    if (!userToFind) {
      const billeteraController = new BilleteraController();
      const user = await UserModel.create(data);
      // when user is created, create the wallet and asigned
      const newWallet = await billeteraController.asignWallet(
        user._id as string
      );

      // asign new wallet to the user.
      user.walletId = newWallet._id as string;
      await user.save();

      const newUser = await UserModel.findById(user._id, {
        password: 0,
      }).populate("walletId", {
        _id: 0,
        userId: 0,
        createdAt: 0,
        updatedAt: 0,
      });

      return {
        message: "user created",
        data: {
          user: newUser,
        },
      };
    } else {
      throw new Error("User already exist");
    }
  }
  async update(id: string, data: Partial<IUser>) {
    const updated = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (!updated) {
      throw new Error("User not found");
    }
    return updated;
  }
  async delete(id: string): Promise<boolean> {
    const deleted = await UserModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
