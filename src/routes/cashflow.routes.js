import express from 'express';
import { createCashIn, createCashOut } from '../controllers/cashflow.controller.js';

const router = express.Router();

router.post('/cash-in', createCashIn);
router.post('/cash-out', createCashOut);

export default router