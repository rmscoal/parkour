const { validationResult } = require('express-validator');
const httpStatus = require('http-status');
// const { QueryTypes } = require('sequelize');
const logger = require('../config/logger');
const { parking } = require('../db/models');

const registerParking = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Unsuccessful request processed!');
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      errors: errors.array(),
    });
  }

  try {
    const data = req.body;

    // Generate local time if in_time is not passed
    if (!data.in_time) {
      data.in_time = new Date(new Date().toLocaleString('en', { timeZone: 'Asia/Jakarta' }));
    }

    const newParking = await parking.create({
      vech_type: data.vech_type,
      vech_num: data.vech_num,
      in_time: data.in_time,
    });

    return res.status(httpStatus.CREATED).json({
      data: newParking.toJSON(),
    });
  } catch (err) {
    logger.error(`There occured an error: ${err.message}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      errors: {
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      },
    });
  }
};

const unregisterParking = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Unsuccessful request processed');
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      errors: errors.array(),
    });
  }

  return res.status(httpStatus.OK).json({
    meessage: 'hello',
  });
};

module.exports = {
  registerParking,
  unregisterParking,
};
