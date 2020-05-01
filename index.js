const express = require('express');
const log4js = require('log4js');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const ErrorHandlerMiddleware = require('./app/utils/ErrorHandlerMiddleware');
const { PREFIX } = require('./app/config/AppConfig');


const app = express();

const logger = log4js.getLogger('payment-ms');

const { PORT = 5000 } = process.env;


// middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.error(reason.stack);
});

// routes
app.use(PREFIX, routes);
app.use(ErrorHandlerMiddleware.MainHandler);


// starting the server
app.listen(PORT, () => {
  console.log('Escuchando puerto:', PORT);
});

module.exports = app;
