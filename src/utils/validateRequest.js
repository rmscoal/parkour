/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const { validationResult } = require('express-validator');
const ApiError = require('./ApiError');

/**
 * Validation result in express-validator.
 * @param {Request} req
 * Throws new ApiError upon entity error.
 */
const validateRequest = async (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let message = '';
    for (let i = 0; i < errors.errors.length; i += 1) {
      message += `${errors.errors[i].msg}`;
    }
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, message);
  }
};

module.exports = validateRequest;
