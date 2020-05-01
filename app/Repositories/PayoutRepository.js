const DB = require('../utils/DB');

const PayoutRepository = module.exports;

PayoutRepository.createTransaction = (transactions) => DB('payout').insert(transactions).returning('*');
