// const config = require('../../config/config');
const logger = require('../../config/logger');

module.exports = {
  development: {
    // url: config.pg_url,
    url: 'postgres://rmscoal:password@localhost:5432/parkour_development',
    protocol: 'postgres',
    dialect: 'postgres',
    dialectOption: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
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
