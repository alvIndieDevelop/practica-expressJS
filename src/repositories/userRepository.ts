import { IUserRepository, IUser } from "types/userTypes";

export class UserRepository implements IUserRepository {
  private users: IUser[] = [];

  create(entity: IUser): Promise<IUser> {
    this.users.push(entity);
    return Promise.resolve(entity);
  }

  findAll(): Promise<IUser[]> {
    return Promise.resolve(this.users);
  }

  findById(id: string): Promise<IUser> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return Promise.reject(new Error("User not found"));
    }
    return Promise.resolve(user);
  }

  update(entity: IUser): Promise<IUser> {
    const index = this.users.findIndex((user) => user.id === entity.id);
    if (index === -1) {
      return Promise.reject(new Error("User not found"));
    }
    this.users[index] = entity;
    return Promise.resolve(entity);
  }

  delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return Promise.reject(new Error("User not found"));
    }
    this.users.splice(index, 1);
    return Promise.resolve();
  }
}
