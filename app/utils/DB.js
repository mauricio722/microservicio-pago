const knex = require('../../node_modules/knex');
const config = require('../config/database');

const DB = knex(config);

module.exports = DB;
