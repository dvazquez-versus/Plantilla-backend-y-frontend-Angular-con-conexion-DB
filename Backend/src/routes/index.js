import express from 'express';
import { login } from '../controllers/login-controller.js';
import testRouter from './test-router.js';
import userRouter from './user-router.js';
import departamentRouter from './departament-router.js'; 


const router = express.Router();

router.post('/login', login);


router.use(testRouter);
router.use(userRouter);
router.use(departamentRouter);




// TEST ROUTER
router.use(testRouter);

export default router;
