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
    const results = await Packaging.findAll();
    res.json(results); 
});
   export default router;