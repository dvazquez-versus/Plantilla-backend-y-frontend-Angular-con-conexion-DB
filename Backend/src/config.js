// config.js
import 'dotenv/config';

const config = {
  port: process.env.PORT || 8080,

  icon: {
    url: process.env.ICON_URL,
    apiKey: process.env.ICON_API_KEY,
  },

  app: {
    secretKey: process.env.SECRET_KEY,
    tokenExpiration: process.env.TOKEN_EXPIRATION || '1h',
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
  },
};

export const jph = {
  url: process.env.JPH_URL,
};

export default config;
