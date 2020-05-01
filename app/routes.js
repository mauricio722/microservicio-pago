const express = require('../node_modules/express');
const PaymentController = require('./controller/PaymentController');

const router = express.Router();

router.post('/payment', PaymentController.create);
router.get('/payment/success', PaymentController.success);
router.post('/payout', PaymentController.payout);


module.exports = router;
