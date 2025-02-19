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
      const user = new UserModel(data);
      await user.save();
      // when user is created, create the wallet and asigned
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
