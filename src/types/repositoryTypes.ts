export interface Repository<T = unknown> {
  create(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
