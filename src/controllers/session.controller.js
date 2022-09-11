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
    if(!res.locals.user){
        return res.send(false)
    }
    const userName = res.locals.user;
    res.status(200).send(userName)
}

async function getUserID(token){
    const session = await db.collection('sessions').findOne({token})
    console.log(token)
    if (!session) {
        return false
    }
    return session.user_id
}


setInterval(()=> {
    const tokenTimer = 600000
    const minimum = Date.now() - tokenTimer

db.collection('sessions').deleteMany({time: {$lt: minimum}})
.catch((error)=> console.log(error))

},20000)


export {
    createSession,
    validateSession,
    getUserID
}