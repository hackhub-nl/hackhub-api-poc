import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
const algo = config.get<jwt.Algorithm | undefined>("signTokenAlgorithm");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    // check if options is undefined before spreading it
    ...(options && options),
    algorithm: algo,
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
