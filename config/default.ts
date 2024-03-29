import * as dotenv from "dotenv";
dotenv.config();

export default {
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
  clientUri: process.env.CLIENT_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDB: process.env.POSTGRES_DB,
};

