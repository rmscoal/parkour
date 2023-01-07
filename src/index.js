const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { sequelize } = require('./db/models');
const { parkingScheduler } = require('./services/scheduler');

let server;

const connectDB = async () => {
  logger.info('Checking database connection');

  try {
    await sequelize.authenticate();
  } catch (err) {
    logger.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

(async () => {
  await connectDB();

  // Start schedulers here!
  parkingScheduler.start();

  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
})();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
