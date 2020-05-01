const Paypal = module.exports;

const paypalConfig = require('../config/paypalConfig');
const log4js = require('./logger');
const logUtils = require('./LogUtils');

Paypal.create = (pay) => new Promise((resolve, reject) => {
  const logName = 'Paypal create: ';

  const logger = logUtils.getLoggerWithId(log4js, logName);

  paypalConfig.payment.create(pay, (error, payment) => {
    logger.info(`Start paypalConfig.create: body ${JSON.stringify(pay)}`);

    if (error) return reject(error);

    return resolve(payment);
  });
});

Paypal.execute = (paymentId, success) => new Promise((resolve, reject) => {
  paypalConfig.payment
    .execute(paymentId, success, (error, payment) => {
      if (error) return reject(error);

      return resolve(payment);
    });
});

Paypal.payout = (confi, syncMode) => new Promise((resolve, reject) => {
  paypalConfig.payout.create(confi, syncMode, (error, payout) => {
    if (error) return reject(error.response);

    return resolve(payout);
  });
});

Paypal.getPayment = (paymentId) => new Promise((resolve, reject) => {
  paypalConfig.payment.get(paymentId, (error, payment) => {
    if (error) return reject(error);

    return resolve(payment);
  });
});

Paypal.getPayout = (payoutId) => new Promise((resolve, reject) => {
  paypalConfig.payout.get(payoutId, (error, payout) => {
    if (error) return reject(error);

    return resolve(payout);
  });
});
