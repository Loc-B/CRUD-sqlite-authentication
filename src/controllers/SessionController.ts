import knex from '../database/connection';
import {Request, Response} from 'express';

class SessionController {
    async create(request: Request, response: Response){
        const {email, password} = request.body;
        const user = await knex('users').where({
            email: `${email}`,
            password: `${password}`
        })
        .select('id', 'name', 'email', 'password').first();
        if (!user){
            return response.status(400).json({error: 'User and password incorrect'})
        }
        return response.json(user);
    }
} 

export default SessionController;