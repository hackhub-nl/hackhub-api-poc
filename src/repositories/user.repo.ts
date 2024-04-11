import { User } from "../models/user.model";
import bcrypt from "bcrypt";

interface IUserRepo {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(userId: number): Promise<void>;
  getById(userId: number): Promise<User>;
  getAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  comparePassword(candidatePassword: string, user: User): Promise<Boolean>;
}

export class UserRepo implements IUserRepo {
  
  async save(user: User): Promise<void> {
    try {
      await User.create({
        name: user.name,
        username: user.username,
        password: user.password,
        email: user.email,
      });
    } catch (error) {
      throw new Error("Failed to create user!");
    }
  }

  async update(user: User): Promise<void> {
    try {
      const usr = await User.findOne({
        where: {
          id: user.id,
        },
      });

      if (!usr) {
        throw new Error("User not found!");
      }
      usr.name = user.name;
      usr.username = user.username;
      usr.password = user.password;
      usr.email = user.email;

      await usr.save();
    } catch (error) {
      throw new Error("Failed to update user!");
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      const usr = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!usr) {
        throw new Error("User not found!");
      }
      await usr.destroy();
    } catch (error) {
      throw new Error("Failed to delete user!");
    }
  }

  async getById(userId: number): Promise<User> {
    try {
      const usr = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!usr) {
        throw new Error("User not found!");
      }
      return usr;
    } catch (error) {
      throw new Error("Failed to get user by id!");
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Failed to get all users!");
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const usr = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!usr) {
        throw new Error("User not found!");
      }

      return usr;
    } catch (error) {
      throw new Error("Failed to get user by email!");
    }
  }

  async comparePassword(candidatePassword: string, user: User): Promise<Boolean> {
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);

  }
}
