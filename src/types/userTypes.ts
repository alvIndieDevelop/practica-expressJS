import { Repository } from "./repositoryTypes";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  document: string;
}

export interface IUserRepository extends Repository<IUser> {}

export interface IUserService {
  create(user: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  delete(id: string): Promise<void>;
}
