const PaymentRepository = module.exports;
const DB = require('../utils/DB');


PaymentRepository.createTransaction = (transactions) => DB('payment').insert(transactions).returning('*');
PaymentRepository.create = (transactions) => DB('payout-transactions')
  .insert(transactions).returning('*');
