const logger = require('../../config/logger');

module.exports = {
  development: {
    url: process.env.PG_URL,
    protocol: 'postgres',
    dialect: 'postgres',
    dialectOption: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      /*
       * Set this value to 0 so connection pool eviction
       * logic eventually cleans up all connections
       * in the event of a Lambda function timeout.
       */
      min: 0,
      /*
       * Choose a small enough value that fails fast if
       * a connection takes too long to be established.
       */
      acquire: 30000,
      /*
       * Set this value to 0 so connections are eligible
       * for cleanup immediately after they're returned to
       * the pool.
       */
      idle: 0,
    },
  },
  test: {
    url: process.env.PG_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.PG_URL,
    dialect: 'postgres',
  },
  logging: (...msg) => logger.debug(msg),
};
