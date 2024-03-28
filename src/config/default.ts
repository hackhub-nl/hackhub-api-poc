export default {
  serverPort: process.env.SERVER_PORT,
  clientUri: process.env.CLIENT_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN
};