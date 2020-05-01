const PaymentController = module.exports;
const log4js = require('../utils/logger');
const logUtils = require('../utils/LogUtils');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const PaymentsSchema = require('../validators/PaymentsSchema');
const PaymentService = require('../services/PaymentService');
const Validator = require('../validators/Validator');
const PayoutSchema = require('../validators/PayoutSchema');


PaymentController.create = async (req, res, next) => {
  const logName = 'Create Payment: ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;
  logger.info(`Start PaymentController.create: body ${JSON.stringify(body)}`);

  try {
    Validator(PaymentsSchema).validateRequest(body);

    return PaymentService.create(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

PaymentController.success = async (req, res, next) => {
  const logName = 'Get Payment: ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { query } = req;
  logger.info(`Start PaymentController.success: query ${JSON.stringify(query)}`);

  try {
    return PaymentService.success(query, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

PaymentController.payout = async (req, res, next) => {
  const logName = 'Create payout: ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;
  logger.info(`Start PaymentController.payout: body ${JSON.stringify(body)}`);

  try {
    Validator(PayoutSchema).validateRequest(body);

    return PaymentService.payout(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};
