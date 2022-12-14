const { validationResult } = require('express-validator');
const httpStatus = require('http-status');
// const { QueryTypes } = require('sequelize');
const logger = require('../config/logger');
const { Parking } = require('../db/models');

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

  try {
    const model = req.body;

    const parking = await Parking.create({
      vech_type: model.vech_type,
      vech_num: model.vech_num,
    });

    await parking.save();

    return res.status(httpStatus.CREATED).json({
      data: parking.toJSON(),
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

module.exports = {
  getParking,
  registerParking,
};
