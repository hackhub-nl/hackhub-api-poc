import { User } from "../model/User";

interface IUserRepo {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(userId: number): Promise<void>;
  getById(userId: number): Promise<void>;
  getAll(): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export class UserRepo implements IUserRepo {
    save(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(userId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getById(userId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}
