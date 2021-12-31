import { Sequelize } from "sequelize";
import config from '../config/config';

const dbConfig = (config as any)[process.env.ENV as any];

const sequelize: Sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: 3306,
    logging: (process.env.ENV !== 'prod') ? console.log : undefined,
    dialect : 'mysql',
    pool: { max: 1, idle: 30}
  }
);

export { Sequelize } ;
export { sequelize } ;