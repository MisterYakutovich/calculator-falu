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
 app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://misteryakutovich.github.io");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 app.use(controller);

 app.get('/api/test', (req, res) => {
  res.send('API работает');
});

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

export default async (req, res) => {
  if (!app.listen) {
    await start();
  }
  app(req, res);
};
