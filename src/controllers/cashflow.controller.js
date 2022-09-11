import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import db from '../database/db.js';
import { validateCashflowData } from '../schemas/cashflow.schemas.js'


async function createCashIn(req, res) {

    const user_id = res.locals.user._id;
    const validation = validateCashflowData(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }
    const { value, description } = req.body
    const valueNumber = Number('+' + value)
    const dataCashIn = {
        user_id,
        value: valueNumber,
        description,
        type: 'positive',
        date: dayjs().format('DD/MM')
    }

    try {
        db.collection('cashflow').insertOne(dataCashIn);
        return res.sendStatus(202);
    } catch (error) {
        return res.status(422).send(error.message);
    }
}

async function createCashOut(req, res) {

    const user_id = res.locals.user._id;
    const validation = await validateCashflowData(req.body)

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    const { value, description } = req.body
    const valueNumber = Number('-' + value)
    const dataCashOut = {
        user_id,
        value: valueNumber,
        description,
        type: 'negative',
        date: dayjs().format('DD/MM')
    }
    try {
        db.collection('cashflow').insertOne(dataCashOut);
        return res.sendStatus(202);
    } catch (error) {
        return res.status(422).send(error.message);
    }
}


async function listCashflow(req, res) {
    const user_id = res.locals.user._id;
    try {
        const cashflowList = await db.collection('cashflow').find({ user_id: ObjectId(user_id) }).toArray();
        return res.status(200).send(cashflowList)
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

async function getBalance(req, res) {
    let balance = 0
    const user_id = res.locals.user._id;
    try {
        const cashflowList = await db.collection('cashflow').find({ user_id: ObjectId(user_id) }).toArray();
        cashflowList.forEach((item)=> {
        console.log(balance)
            balance += item.value
        })
        return res.send({balance: balance})
    } catch (error) {
        return res.sendStatus(404)
    }
}

export {
    createCashIn,
    createCashOut,
    listCashflow,
    getBalance
}