import express from 'express';
import {validateSession} from '../controllers/session.controller.js';
import authorizationMiddleware from '../middlewares/token-auth.middleware.js';


const router = express.Router();
router.use(authorizationMiddleware);
router.get('/session', validateSession);

export default router