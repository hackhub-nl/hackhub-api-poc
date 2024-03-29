import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";

interface Payload {
  userId: number;
  email: string;
  name: string;
  username: string;
}

class Authentication {
  public static async passwordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(config.get<number>("salt"));

    const hash = await bcrypt.hashSync(password, salt);

    return hash;
  }

  public static async passwordCompare(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean> {
    return await bcrypt
      .compare(candidatePassword, userPassword)
      .catch((err) => false);
  }

  public static generateToken(
    id: number,
    email: string,
    name: string,
    username: string
  ): string {
    const secretKey: string = config.get<string>("jwtSecretKey") || "secret";
    const payload: Payload = {
      userId: id,
      email: email,
      name: name,
      username: username,
    };

    const option = { expiresIn: config.get<string>("jwtExpiresIn") };

    return jwt.sign(payload, secretKey, option);
  }

  public static validateToken(token: string): Payload | null {
    try {
      const secretKey: string = config.get<string>("jwtSecretKey") || "secret";
      return jwt.verify(token, secretKey) as Payload;
    } catch (error) {
      return null;
    }
  }
}

export default Authentication;
