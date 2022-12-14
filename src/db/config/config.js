// const config = require('../../config/config');
const logger = require('../../config/logger');

module.exports = {
  development: {
    // url: config.pg_url,
    url: 'postgres://rmscoal:password@localhost:5432/parkour_dev',
    protocol: 'postgres',
    dialect: 'postgres',
    dialectOption: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    dialect: 'postgres',
  },
  production: {
    dialect: 'postgres',
  },
  logging: (...msg) => logger.debug(msg),
};
