import express from 'express';
import { createCashIn, createCashOut, listCashflow, getBalance } from '../controllers/cashflow.controller.js';
import authorizationMiddleware from '../middlewares/token-auth.middleware.js';

const router = express.Router();
router.use(authorizationMiddleware);

router.post('/cash-in', createCashIn);
router.post('/cash-out', createCashOut);
router.get('/cashflow', listCashflow);
router.get('/balance', getBalance);

export default router