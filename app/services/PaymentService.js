const PaymentService = module.exports;
const Paypal = require('../utils/Paypal');
const log4js = require('../utils/logger');

const defaultLogger = log4js.getLogger('UsersServices');
const PaymentsConfig = require('../config/PaymentsConfig');
const PaymentRepository = require('../Repositories/PaymentRepository');
const PayoutRepository = require('../Repositories/PayoutRepository');


PaymentService.create = async (pay, options) => {
  const { logger = defaultLogger } = options;
  logger.info(
    `Start PaymentServices.create: body ${JSON.stringify(pay)}`,
  );

  const {
    name, sku, price, total, description,
  } = pay;
  let href;
  try {
    const { links } = await Paypal.create(
      PaymentsConfig.create(name, sku, price, total, description),
    ).catch((error) => {
      logger.error(`error in create paypal config ::=> ${error.stack} `);

      return undefined;
    });

    logger.info(
      `Start PaymentServices.create: body ${JSON.stringify(links)}`,
    );
    if (links) {
      links.forEach((link) => {
        if (link.rel === 'approval_url') {
          href = link.href;
        }
      });
    }

    return { link: href };
  } catch (error) {
    return null;
  }
};

PaymentService.success = async (payment, options) => {
  const { logger = defaultLogger } = options;
  logger.info(
    `Start PaymentServices.success: body ${JSON.stringify(payment)}`,
  );
  const { PayerID, paymentId } = payment;
  try {
    const { transactions: [transaction] } = await Paypal.getPayment(paymentId);
    const { amount } = transaction;
    const response = await Paypal.execute(paymentId, PaymentsConfig.execute(PayerID, amount));

    if (response) {
      const { id, payer } = response;
      const payerId = payer.payer_info.payer_id;

      const result = await PaymentRepository.createTransaction({ paymentId: id, payerId });

      console.log(result);

      return { success: true };
    }

    return null;
  } catch (error) {
    return { error };
  }
};

PaymentService.payout = async (payment, options) => {
  const { logger = defaultLogger } = options;
  logger.info(
    `Start PaymentServices.payout: body ${JSON.stringify(payment)}`,
  );
  const {
    senderBatchId, email, value, emailSubject, note, senderItemId,
  } = payment;

  try {
    const response = await Paypal.payout(
      PaymentsConfig.payout(senderBatchId, email, value, emailSubject, note, senderItemId),
      'falses',
    );
    console.log(response);


    const payoutId = response.batch_header.payout_batch_id;
    console.log(payoutId);

    const result = await PayoutRepository.createTransaction({ payoutId, senderItemId });

    console.log(result);

    return { success: true };
  } catch (error) {
    return error;
  }
};
