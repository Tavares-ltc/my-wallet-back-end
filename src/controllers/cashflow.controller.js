import dayjs from 'dayjs';
import {validateCashflowData} from '../schemas/cashflow.schemas.js'
import {getUserID} from './session.controller.js'

async function createCashIn(req, res) {
// data, valor, descrição, verificar header com um token, salvar o userID, positivo ou negativo
// ver como faz pra tirar o bearer token do nome
if(!req.headers.authorization) {
    return res.sendStatus(401);
}
const token = req.headers.authorization
try {
    const user_id = await getUserID(token);
    const validation = validateCashflowData(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }
    const {value, description} = req.body
    const valueNumber = Number('+' + value)
    const dataCashIn = {
        user_id,
        value: valueNumber,
        description,
        type: 'positive',
        date: dayjs().format('DD/MM')
    }
    return res.send(dataCashIn)
} catch (error) {
    res.status(422).send(error.message);
}
}

async function createCashOut(req, res) {

}

async function listCashflow (req, res) {

}

export{
    createCashIn,
    createCashOut,
    listCashflow
}