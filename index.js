import { sequelize } from './db.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import controller from './controller/controller.js';
import { SemiFinishedProduct, Packaging, Defect } from './models/models.js';

dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000
 app.use(cors());
 app.use(express.json())
 app.use(bodyParser.json());
 app.use(controller);
 app.get(controller)

 
 const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к БД успешно!');
    await sequelize.sync({ force: false }); // force: false - не удалять таблицы при синхронизации
    console.log('Таблицы синхронизированы!');
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (error) {
    console.error('Критическая ошибка:', error);
    process.exit(1); 
  }
};

export default start();
/*export default async function handler(req, res) {
  
  try {
      await sequelize.authenticate();
      console.log("Подключение к БД");
      await sequelize.sync().then(() => {
        console.log('Tables created successfully!');
        })
     
      app(req, res);
  } catch (error) {
   
      console.error("Ошибка подключения к БД:", error);
      res.status(500).send("Ошибка подключения к базе данных");
  }
}*/