import express from 'express';
import { login } from '../controllers/login-controller.js';
import testRouter from './test-router.js';
import { checkToken } from '../middlewares/auth-middleware.js';
import { pingController}  from '../controllers/test-controller.js';
const router = express.Router();

// Rutas públicas
router.post('/login', login);
router.get('/ping', pingController);

router.use(checkToken, testRouter);


// Middleware: protege todo lo que viene después
router.use(checkToken);

// Rutas protegidas
router.get('/ruta-protegida', (req, res) => {
  res.json({ message: 'Acceso permitido, token válido.' });
});


export default router;
