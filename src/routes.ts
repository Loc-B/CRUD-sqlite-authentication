import express from 'express';
import knex from './database/connection';

import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';

const routes = express.Router();
const uController = new UsersController();
const sController = new SessionController();

routes.post('/session', sController.create);

routes.get("/users", uController.index)

routes.get("/users/:id", uController.show)

routes.post("/users", uController.create);

routes.put("/users/:id", uController.update);

routes.delete("/users/:id", uController.delete);

export default routes;