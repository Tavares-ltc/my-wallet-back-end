import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import joi from 'joi';
import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const mongoClient = new MongoClient(process.env.MONGO_URI)
let db;
mongoClient.connect().then(() => {
    db = mongoClient.db('mywallet');
})

const userDataSchema = joi.object({
    name: joi.string().required().empty(),
    email: joi.string().required().empty().email(),
    password: joi.string().required().empty()
})

app.post('/sign-up', async (req, res)=>{
    const validation = userDataSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error.message);
    };
    const {name, email} = req.body
    const userData = {
        name,
        email,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    try {
        const isEamailUsed = await db.collection('users').findOne({
            email
        })
        if(isEamailUsed) {
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
})

const dataLoginSchema = joi.object({
    email: joi.string().required().empty().email(),
    password: joi.string().required().empty()
})

app.get('/sign-in', async (req, res)=> {
    const validation = dataLoginSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }
    try {
        const userData = await db.collection('users').findOne({email: req.body.email});
       if(userData && bcrypt.compareSync(req.body.password, userData.password)) {
           const token = uuid();
           await db.collection('sessions').insertOne({
            user_id: userData._id,
            token
           })   
           res.status(200).send(token)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(401);
    }
})



app.listen(5000, () => {
    console.log('listen on port 5000')
})