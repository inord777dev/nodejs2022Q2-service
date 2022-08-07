import { DataSource } from 'typeorm';
import configService from './ormconfig';

export const AppDataSource = new DataSource(configService);
