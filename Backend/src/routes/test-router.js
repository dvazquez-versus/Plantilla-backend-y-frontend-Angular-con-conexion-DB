import { Router } from 'express';
import { getAllUsers, getAllRols } from '../controllers/test-controller.js';

const router = Router();


// RUTAS DE TESTING, borrar en nuevos proyectos
router.get('/usuarios', getAllUsers);
router.get('/roles', getAllRols);


export default router;
