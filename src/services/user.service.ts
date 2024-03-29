import { User } from "../models/user.model";
import { UserRepo } from "../repositories/user.repo";
import Authentication from "../utils/authentication";

interface IUserService {
  login(email: string, password: string): Promise<string>;
  register(
    email: string,
    password: string,
    name: string,
    username: string
  ): Promise<void>;
}

export class UserService implements IUserService {
  async login(email: string, password: string): Promise<string> {
    const usr = await new UserRepo().findByEmail(email);

    if (!usr) {
      throw new Error("Bad Request!");
    }

    let compare = await Authentication.passwordCompare(password, usr.password);

    if (compare) {
      return Authentication.generateToken(
        usr.id,
        usr.email,
        usr.name,
        usr.username
      );
    }
    return "";
  }

  async register(
    email: string,
    password: string,
    name: string,
    username: string
  ): Promise<void> {
    try {
      const hashedPassword: string = await Authentication.passwordHash(
        password
      );
      const usr = new User();
      usr.email = email;
      usr.password = hashedPassword;
      usr.username = username;
      usr.name = name;

      await new UserRepo().save(usr);
    } catch (error) {
      throw new Error("Error login!");
    }
  }
}
