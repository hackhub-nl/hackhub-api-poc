import { omit } from "lodash";
import { UserRepo } from "../repositories/user.repo";

export async function createUser(

) {

}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const useRepo = new UserRepo();
  const user = await useRepo.findByEmail(email);

  if (!user) {
    return false;
  }

  const isValid = await useRepo.comparePassword(password, user);

  if (!isValid) return false;

  return omit(JSON.parse(JSON.stringify(user)), "password");
}

export async function findUser(userId: number) {
  const user = await new UserRepo().getById(userId);
  return user;
}

// interface IUserService {
//   login(email: string, password: string): Promise<string>;
//   register(
//     email: string,
//     password: string,
//     name: string,
//     username: string
//   ): Promise<void>;
// }

// export class UserService implements IUserService {
//   async login(email: string, password: string): Promise<string> {
//     const user = await new UserRepo().findByEmail(email);

//     if (!user) {
//       throw new Error("Bad request");
//     }

//     let compare = await Authentication.passwordCompare(password, user.password);

//     if (compare) {
//       return Authentication.generateToken(
//         user.id,
//         user.email,
//         user.name,
//         user.username
//       );
//     }
//     return "";
//   }

//   async register(
//     email: string,
//     password: string,
//     name: string,
//     username: string
//   ): Promise<void> {
//     try {
//       const hashedPassword: string = await Authentication.passwordHash(
//         password
//       );
//       const user = new User();
//       user.email = email;
//       user.password = hashedPassword;
//       user.username = username;
//       user.name = name;

//       await new UserRepo().save(user);
//     } catch (error) {
//       throw new Error("Error register");
//     }
//   }
// }
