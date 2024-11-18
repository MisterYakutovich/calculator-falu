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


const start=async()=>{
  try{
      await sequelize.authenticate()
      console.log("подключение к БД")
      await sequelize.sync().then(() => {
       console.log('Tables created successfully!');
       })
       .catch((error) => {
        console.error('Error creating tables:', error);
       }) // sync() сверяет состояние БД,{ force: true } пересоздать таблицы
     
      app.listen(PORT,()=>console.log(`Server start on port ${PORT}`))
  }catch(e){
    console.log("error")
      console.log(e)
  }
}
start()