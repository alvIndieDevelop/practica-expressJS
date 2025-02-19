import { UserModel, IUser } from "../models/userSchema";

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
      console.log("A");
      const user = new UserModel(data);
      return await user.save();
    } else {
      console.log("B");
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
