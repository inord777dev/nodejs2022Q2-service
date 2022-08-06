import 'dotenv/config';

export const authConstants = {
  cryptSalt: Number(process.env.CRYPT_SALT) || 10,
  accessSecret: process.env.JWT_SECRET_KEY || 'accessKey',
  accessExpires: process.env.TOKEN_EXPIRE_TIME || '1h',
  refreshSecret: process.env.JWT_SECRET_REFRESH_KEY || 'refreshKey',
  refreshExpires: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
};
