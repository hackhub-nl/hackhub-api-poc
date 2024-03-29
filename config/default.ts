import * as dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.SERVER_PORT,
  clientUri: process.env.CLIENT_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
