import { Router } from "express";
import { SemiFinishedProduct, Packaging, Defect } from '../models/models.js';

const router = Router()
router.post('/api/data',async (req, res) => {
    const { productResult, defectiveResult,calcResult,package1 } = req.body;
    if (productResult == null || defectiveResult == null || calcResult == null || package1==null) {
        return res.status(400).json({ error: 'Неполные данные' });
    }
    try {     
        const semiFinishedProduct = await SemiFinishedProduct.create({
            totalQuantity: calcResult 
        });   
        await Packaging.create({
            quantity: package1,
            quantity_in_pieces_pkg: productResult, 
            semiFinishedProduct_id: semiFinishedProduct.id
        });
        await Defect.create({
            weight: defectiveResult,
            quantity_in_pieces_defect: defectiveResult, 
            semiFinishedProduct_id: semiFinishedProduct.id
        });
        res.status(200).json({ message: 'Данные успешно сохранены' });
    } catch (error) {
        console.error('Ошибка сохранения данных:', error);
        res.status(500).json({ error: 'Ошибка сохранения данных' });
    }  
   });
   router.get('/api/get',async (req, res) => {
    try {
        
        const semiFinishedProducts = await SemiFinishedProduct.findAll();       
        const packagings = await Packaging.findAll();    
        const defects = await Defect.findAll();      
        const results = {
          semiFinishedProducts,
          packagings,
          defects
        }
        
        res.json(results);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
        res.status(500).json({ error: 'Ошибка получения данных' });
      }
});

router.put('/api/:id', async (req, res) => {
    console.log('PUT запрос получен');
    const { quantity, quantity_in_pieces_pkg, quantity_in_pieces_defect, totalQuantity} = req.body;
    const id = parseInt(req.params.id, 10);
    console.log('Данные для обновления:', req.body);
    try {
        if (quantity !== undefined || quantity_in_pieces_pkg !== undefined) {
            const [updatedRows] = await Packaging.update(
                { quantity, quantity_in_pieces_pkg },
                { where: { id } }
            );
            if (updatedRows[0] === 0) {
                return res.status(404).json({ error: 'Упаковка не найдена' });
            }
            return res.json({ message: 'Данные упаковки успешно обновлены' });
        }      
        if (quantity_in_pieces_defect !== undefined) {
            const [updatedRows] = await Defect.update(
                { quantity_in_pieces_defect },
                { where: { id } }
            );
            if (updatedRows[0] === 0) {
                return res.status(404).json({ error: 'Брак не найден' });
            }
            return res.json({ message: 'Данные дефекта успешно обновлены' });
        }
        if (totalQuantity !== undefined) {
            const [updatedRows] = await SemiFinishedProduct.update(
                { totalQuantity },
                { where: { id } }
            );
            if (updatedRows[0] === 0) {
                return res.status(404).json({ error: 'Полуфабрикат не найден' });
            }
            return res.json({ message: 'Данные полуфабриката успешно обновлены' });
        }
        return res.status(400).json({ error: 'Нет данных для обновления' });
    } catch (error) {
        console.error('Ошибка обновления данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

export default router;