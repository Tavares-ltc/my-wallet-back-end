import { ObjectId } from "mongodb";
import db from '../database/db.js'

async function validateToken(req, res, next) {
    
    const authorization = req.headers.authorization
    const token = authorization?.replace('Bearer ', '')
    if(!authorization) {
        return res.sendStatus(401);
    }
    
    const user_id = await getUserID(token);
//token, user_id, name
    if(!user_id) {
        return res.sendStatus(401)
    }
    try {
        const user = await db.collection('users').findOne({_id: ObjectId (user_id)})
        if(!user) {
            return res.sendStatus(500);
        }

        res.locals.user = user;
        res.locals.token = token;
        next()
    } catch (error) {
        console.log(err.message)
        return res.sendStatus(404)
    }


}

async function getUserID(token){
    const session = await db.collection('sessions').findOne({token: token})
    if (!session) {
        return false
    }
    return session.user_id
}

export default validateToken