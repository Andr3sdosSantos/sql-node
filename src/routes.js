const express = require('express');

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

/**
 * '/users/:user_id/...' -> como não é possível criar um endereço sem estar associado a um usuário,
 * na rota é necessário usar o encadeamento de rotas: o usuário é informado dentro da rota
 */
routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);

routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs', TechController.store);
routes.delete('/users/:user_id/techs', TechController.delete);

module.exports = routes;
