import express from 'express';
import { createUser, login } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/sign-up', createUser);
router.get('/sign-in', login);

export default router