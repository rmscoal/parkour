const { Umzug, SequelizeStorage } = require('umzug');
const { log } = require('console');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { sequelize } = require('./db/models');
const { parkingScheduler } = require('./services/scheduler');

const umzug = new Umzug({
  migrations: { glob: 'src/db/migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

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
  // Checks db connection is established
  await connectDB();

  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  log('Pending migration(s):\n', await umzug.pending());
  await umzug.up();

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
