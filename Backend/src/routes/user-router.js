import express from 'express';
import { getAllUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController} from '../controllers/user-controller.js';

const router = express.Router();

// Rutas para empleados
router.get('/empleados', getAllUsersController);
router.get('/empleados/:id', getUserByIdController);
router.post('/empleados', createUserController);
router.put('/empleados/:id', updateUserController);
router.delete('/empleados/:id', deleteUserController);

export default router;
