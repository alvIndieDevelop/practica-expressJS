import { UserModel } from "../models/userSchema";

type T_User = {
  id: String;
  name: String;
  email: String;
  password: String;
  document: String;
};

export class UserController {
  async find() {
    return await UserModel.find().exec();
  }
  async findOne(id: string) {
    return await UserModel.findById(id).exec();
  }
  async create(data: T_User) {
    const user = new UserModel(data);
    return await user.save();
  }
  async update(id: string, data: T_User) {
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
