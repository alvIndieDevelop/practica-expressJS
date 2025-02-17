import { IUserRepository, IUserService, IUser } from "types/userTypes";

export class UserService implements IUserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async create(user: IUser): Promise<IUser> {
    return this.repository.create(user);
  }

  async findAll(): Promise<IUser[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
  update(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
