const { validationResult } = require('express-validator');
const httpStatus = require('http-status');
const logger = require('../config/logger');

const getParking = async (req, res) => {
  res.status(httpStatus.CREATED).json(req.body);
};

const registerParking = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Unsuccessful request processed!');
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      errors: errors.array(),
    });
  }

  logger.http('Succesful request processed!');
  return res.status(httpStatus.CREATED).json(req.body);
};

module.exports = {
  getParking,
  registerParking,
};
