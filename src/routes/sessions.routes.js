import express from 'express';
import {validateSession} from '../controllers/session.controller.js';

const router = express.Router();

router.get('/session', validateSession);

export default router