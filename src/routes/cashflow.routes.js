import express from 'express';
import { createCashIn, createCashOut, listCashflow, getBalance, deleteCashflow, editCashflow } from '../controllers/cashflow.controller.js';
import authorizationMiddleware from '../middlewares/token-auth.middleware.js';

const router = express.Router();
router.use(authorizationMiddleware);

router.post('/cash-in', createCashIn);
router.post('/cash-out', createCashOut);
router.get('/cashflow', listCashflow);
router.get('/balance', getBalance);
router.delete('/cashflow', deleteCashflow);
router.put('cashflow', editCashflow)

export default router