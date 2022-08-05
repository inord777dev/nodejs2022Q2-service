import 'dotenv/config';

export const authConstants = {
  accessSecret: process.env.ACCESS_SECRET || 'accessKey',
  accessExpires: process.env.ACCESS_EXPIRES || '1d',
  refreshSecret: process.env.REFRESH_SECRET || 'refreshKey',
  refreshExpires: process.env.REFRESH_EXPIRES || '2d',
};
