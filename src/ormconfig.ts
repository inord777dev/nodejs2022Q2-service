import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';

dotenv.config();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: true,
  entities: [User],
  migrations: ['src/**/migrations/*.js'],
  migrationsRun: true,
};

export default options;
