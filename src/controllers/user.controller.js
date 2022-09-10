import { validateSignupData, validateLogin } from '../schemas/user.schemas.js';
import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';

import db from '../database/db.js'
import { createSession } from './session.controller.js'

async function createUser(req, res) {
    const validation = validateSignupData(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error.message);
    };
    const { name, email } = req.body
    const userData = {
        name,
        email,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    try {
        const isEamailUsed = await db.collection('users').findOne({
            email
        })
        if (isEamailUsed) {
            return res.status(409).send('Email already in use.')
        }

        const user = await db.collection('users').insertOne(userData);
        await db.collection('cashflow').insertOne({
            user_id: user._id
        })
        return res.sendStatus(201);
    } catch (error) {
        console.error(error)
        return res.send(422);
    }
}

async function login(req, res) {
    const validation = validateLogin(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }
    try {
        
        const userData = await db.collection('users').findOne({ email: req.body.email });
        const session = await db.collection('sessions').findOne({ user_id: userData._id });
        console.log(userData._id)
        console.log(session)
        if (session) {
            return res.sendStatus(409)
        }
        if (userData && bcrypt.compareSync(req.body.password, userData.password)) {
            const token = await createSession(userData._id)
            console.log('teu ' + token)
            res.status(200).send(token)
        } else {
            return res.sendStatus(404)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(401);
    }
}
export {
    createUser,
    login
}