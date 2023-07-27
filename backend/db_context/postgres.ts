import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { ForumComment, ForumTopic, UserTheme } from '../models';

const sequelizeOptions: SequelizeOptions = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '1991',
  database: process.env.POSTGRES_DATABASE || 'my_db',
  models: [UserTheme, ForumTopic, ForumComment],
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

export { sequelize };
