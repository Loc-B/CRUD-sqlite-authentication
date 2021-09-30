import knex from '../database/connection';
import {Request, Response} from 'express';

class UsersController{
    async create(request: Request, response: Response){
        const {
            name,
            email,
            password
        } = request.body;
    
        await knex('users').insert({
            name,
            email,
            password
        })
        return response.json({success: true})
    }
    async index(request: Request, response: Response){
        const {key} = request.headers;
        if(!key){
            return response.status(400).json({message: "User not authorizeddd"})
        }
        const user = await knex('users').where('id', key).first();
        if(!user){
            return response.status(400).json({message: "User not authorized"})
        }


        const users = await knex('users').select('*');
        return response.json(users)
    }
    async show(request: Request, response: Response){
        const {key} = request.headers;
        if(!key){
            return response.status(400).json({message: "User not authorizeddd"})
        }
        const userKey = await knex('users').where('id', key).first();
        if(!userKey){
            return response.status(400).json({message: "User not authorized"})
        }


        const {id} = request.params;
        const user = await knex('users').where('id', id).first();
        if(!user){
            return response.status(400).json({message: "User not found"})
        }
        return response.json(user);
    }
    async delete(request: Request, response: Response){
        const {key} = request.headers;
        if(!key){
            return response.status(400).json({message: "User not authorizeddd"})
        }
        const userKey = await knex('users').where('id', key).first();
        if(!userKey){
            return response.status(400).json({message: "User not authorized"})
        }


        const {id} = request.params;
        const user = await knex('users').where('id', id).del();
        if(user === 0){
            return response.status(400).json({message: "User not found"})
        }
        return response.status(200).json({message: "Deleted with success"})
    }
    async update(request: Request, response: Response){
        const {key} = request.headers;
        if(!key){
            return response.status(400).json({message: "User not authorizeddd"})
        }
        const userKey = await knex('users').where('id', key).first();
        if(!userKey){
            return response.status(400).json({message: "User not authorized"})
        }


        const {id} = request.params;
        const {
            name,
            email,
            password
        } = request.body;
        const user = await knex('users').where('id', id).update({
            name,
            email,
            password
        })
        if(!user){
            return response.status(400).json({message: "User not found"})
        }
        return response.status(200).json({message: "Update with success"});
    }
}


export default UsersController;