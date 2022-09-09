import express from 'express';
import cors from 'cors';

import {createUser, login} from './controllers/user.controller.js'
import {validateSession} from './controllers/session.controller.js'

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', createUser)
app.get('/sign-in', login)

app.get('/session', validateSession)

app.listen(5000, () => {
    console.log('listen on port 5000')
})