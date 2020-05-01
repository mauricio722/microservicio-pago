const paypalConfig = require('paypal-rest-sdk');

paypalConfig.configure({
  mode: 'sandbox',
  client_id: 'AZpMUK_fT2I6g4ciccMW-KzMGmuxA4oR0kRwXEiFxIu0K9yv-Pj_SbUwvKB53Mr-udKyYhnDSGOkLR5a',
  client_secret: 'EMIPRTM9sWf2X0Mq3wPIcuNfaCwExeeqtyekSyqKTv1VocEoq7GQJvt-OhLvbeI2jHhKsfuUecmv5sRG',
});
module.exports = paypalConfig;
