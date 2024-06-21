import * as dotenv from "dotenv";
dotenv.config();

export default {
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
  clientUri: process.env.CLIENT_URL,

  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDB: process.env.POSTGRES_DB,

  saltWorkFactor: Number(process.env.SALT_WORK_FACTOR),
  signTokenAlgorithm: process.env.SIGN_TOKEN_ALGORITHM,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,

  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};
