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
   host:process.env.DB_HOST,
   dialect: 'mysql',
   dialectModule: await getDialectModule(),
   logging: console.log,
   pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
   });

   (async () => {
      try {
          await sequelize.authenticate();
          console.log('Соединение с базой данных успешно установлено.');
      } catch (error) {
          console.error('Не удалось подключиться к базе данных:', error);
      }
  })();