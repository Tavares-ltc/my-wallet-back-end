import db from '../database/db.js'
import { v4 as uuid } from 'uuid';


async function createSession(user_id) {
    const token = uuid();
    await db.collection('sessions').insertOne({
        user_id,
        time: Date.now(),
        token
    })
    return token
}
async function validateSession(req, res) {
    if(!req.headers.authorization){
        return res.sendStatus(422)
    }
    const token = req.headers.authorization
    try {
        const isValid = await db.collection('sessions').findOne({token: token});
        if(!isValid){
            return res.sendStatus(401);
        }
        console.log(isValid)
        res.sendStatus(200)

    } catch (error) {
        console.log(err.message)
        res.sendStatus(500)
    }
}

async function getUserID(token){
    const session = await db.collection('sessions').findOne({token})
    console.log(token)
    if (!session) {
        return false
    }
    return session.user_id
}


// setInterval(()=> {
//     const tokenTimer = 100000
//     const minimum = Date.now() - tokenTimer

// db.collection('sessions').deleteMany({time: {$lt: minimum}})
// .catch((error)=> console.log(error))

// },15000)


export {
    createSession,
    validateSession,
    getUserID
}