import { omit } from "lodash";
import { User } from "../models/user.model";

export async function registerUser(
  email: string,
  name: string,
  password: string
) {
  try {
    const user = await User.create({
      email: email,
      name: name,
      password: password,
    });
    return omit(JSON.parse(JSON.stringify(user)), "password");
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(JSON.parse(JSON.stringify(user)), "password");
}

export async function findUser(userId: number) {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Failed to get user by id!");
  }
}
