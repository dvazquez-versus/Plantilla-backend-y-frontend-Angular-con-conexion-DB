import { Router } from 'express';
import { pingController, getAllUsersController, getAllDepartamentsController } from '../controllers/test-controller.js';

const router = Router();


// RUTAS DE TESTING
router.get('/ping', pingController);

router.get('/usuarios', getAllUsersController);
router.get('/departamentos', getAllDepartamentsController);


export default router;
