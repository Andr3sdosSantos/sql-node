const Sequelize = require('sequelize');

const dbConfig = require('../config/database');
const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Tech.init(connection);

/**
 * Chamando o 'associate' para fazer conexão
 */
User.associate(connection.models);
Address.associate(connection.models);
Tech.associate(connection.models);

module.exports = connection;
