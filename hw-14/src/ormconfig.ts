import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/User.entity';
import { Exhibit } from './exhibit/Exhibit.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'yevheniii',
  password: process.env.DB_PASSWORD || 'qwerty12345',
  database: process.env.DB_NAME || 'nest_exhibitblog',
  synchronize: false,
  logging: true,

  entities: [User, Exhibit],
  migrations: ['./src/migrations/*.ts'],
});

// npm run migration:generate -- ./src/migrations/MigrationName -d ./src/ormconfig.ts
