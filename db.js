import {Sequelize} from "sequelize"
import dotenv from 'dotenv';

dotenv.config();
const getDialectModule = async () => {
   const { default: mysql2 } = await import('mysql2');
   return mysql2;
  };

export const sequelize=  new Sequelize(
   process.env.DB_NAME, 
   process.env.DB_USER, 
   process.env.DB_PASSWORD, 
   {
   dialect: 'mysql',
   dialectModule: await getDialectModule(),
   logging: console.log,
   host:process.env.DB_HOST,
   port:process.env.DB_PORT,
   });