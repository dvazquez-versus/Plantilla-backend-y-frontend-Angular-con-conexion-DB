import express from 'express';
import {
  getAllDepartamentsController, getDepartamentByIdController, createDepartamentController, updateDepartamentController, deleteDepartamentController} from '../controllers/departament-controller.js';

const router = express.Router();

// Rutas para departamentos
router.get('/departamentos', getAllDepartamentsController);
router.get('/departamentos/:id', getDepartamentByIdController);
router.post('/departamentos', createDepartamentController);
router.put('/departamentos/:id', updateDepartamentController);
router.delete('/departamentos/:id', deleteDepartamentController);

export default router;
