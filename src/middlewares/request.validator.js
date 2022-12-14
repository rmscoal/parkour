const httpStatus = require('http-status');
const { body } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * regiesteringParkingValidation is a middleware function
 * used for validating the incoming request body accordingly
 * to its routes. Firstly, it is done by checking whether the
 * incoming body request is an application/json format. Next
 * it validates the body request.
 * @param {string} method type of methods to validate
 * @returns []validations
 */
// eslint-disable-next-line consistent-return
const registerParkingValidation = (method) => {
  // eslint-disable-next-line default-case
  switch (method) {
    case 'registeringParking': {
      return [
        body('type').exists().isIn(['motor', 'mobil']).withMessage('Invalid vehicle type'),
      ];
    }
  }
};

const checkoutParkingValidation = async (req, _res, next) => {
  if (!req.is('application/json')) {
    next(new ApiError(httpStatus.BAD_REQUEST, 'Format can only be application/json'));
  }

  const { type } = req.body;

  if (type !== 'mobil' && type !== 'motor') {
    next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid vehicle type'));
  } else {
    next();
  }
};

module.exports = {
  registerParkingValidation,
  checkoutParkingValidation,
};
