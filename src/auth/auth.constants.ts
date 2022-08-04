import 'dotenv/config';

export const authConstants = {
  secret: process.env.SECRET || 'secretKey',
};
