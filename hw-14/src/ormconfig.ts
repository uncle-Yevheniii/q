import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/User.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yevheniii',
  password: 'qwerty12345',
  database: 'nest_exhibitblog',
  synchronize: false,
  logging: true,

  entities: [User],
  migrations: ['./src/migrations/*.ts'],
});

// npm run migration:generate -- ./src/migrations/MigrationName -d ./src/ormconfig.ts
