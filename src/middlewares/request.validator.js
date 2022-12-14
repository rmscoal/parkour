const { body, check } = require('express-validator');
const { parking } = require('../db/models');

/**
 * @helper
 * emptyStringValidator validates whether the passed in data
 * is an empty string and throws new Error if it does not
 * satisfy. On the other hand, it retuns a true boolean.
 * @param {string} value
 * @returns {new Error()}
 * @returns {boolean}
 */
const emptyStringValidator = (value) => {
  if (value === '') {
    throw new Error('Either pass in_time with value or not passing in_time at all');
  }

  return true;
};

/**
 * @helper
 * validateVechNumUnregistered validates whether the passed in data
 * of a vehicle license plate has been registered and still parking.
 * If there exist a vehicle with the same license plate with the value
 * passed and is still parking, then throws an Error. Otherwise, it
 * passes this validation.
 * @param {string} value vehicle's license plate (vech_num)
 * @returns {new Error()}
 * @returns {boolean} true
 */
const validateVechNumUnregistered = async (value) => {
  const checkParking = await parking.findOne({
    where: {
      vech_num: value,
      out_time: null,
    },
  });

  if (checkParking == null) {
    return true;
  }

  throw new Error('Vehicle registered and has not exit');
};

/**
 * @helper
 * validateVechNumIsRregistered validates whether the passed in data
 * of a vehicle license plate has been registered and still parking.
 * If there exist a vehicle with the same license plate with the value
 * passed and is still parking, then throws an Error. Otherwise, it
 * passes this validation.
 * @param {string} value vehicle's license plate (vech_num)
 * @returns {new Error()}
 * @returns {boolean} true
 */
const validateVechNumIsRegistered = async (value) => {
  const checkParking = await parking.findOne({
    where: {
      vech_num: value,
      out_time: null,
    },
  });

  if (checkParking == null) {
    throw new Error('Vehicle registered and has not exit');
  }

  return true;
};

/**
 * regiesteringParkingValidation is a middleware function
 * used for validating the incoming request body accordingly
 * to its routes. The validation consists of:
 * @property {string} vech_type required and in ['mobil', 'motor]
 * @property {string} vech_num required and matches indo license plate
 * @property {date} in_time optional and is a date
 *
 * @param {string} method type of methods to validate
 * @returns []validations
 */
// eslint-disable-next-line consistent-return
const parkingValidation = (method) => {
  // eslint-disable-next-line default-case
  switch (method) {
    case 'registeringParking': {
      return [
        body('vech_type').exists().isIn(['motor', 'mobil']).withMessage('Invalid vehicle type'),
        body('vech_num').exists().withMessage('Vehicle number is required').isLength({ min: 4, max: 11 })
          .withMessage('Invalid length of vehicle number')
          .matches(/^[A-Z]{1,2}\s[0-9]{1,4}\s[A-Z]{0,3}/)
          .withMessage('Invalid licesence plate')
          .custom((value) => validateVechNumUnregistered(value)),
        check('in_time').optional().isISO8601().withMessage('ISO8601 format is required')
          .custom((value) => emptyStringValidator(value))
          .toDate(),
      ];
    }

    case 'unregisterParking': {
      return [
        body('vech_num').exists().withMessage('Vehicle number is required').isLength({ min: 4, max: 11 })
          .withMessage('Invalid length of vehicle number')
          .matches(/^[A-Z]{1,2}\s[0-9]{1,4}\s[A-Z]{0,3}/)
          .withMessage('Invalid licesence plate')
          .custom((value) => validateVechNumIsRegistered(value)),
      ];
    }
  }
};

/**
 * regiesteringParkingValidation is a middleware function
 * used for validating the incoming request body accordingly
 * to its routes. The validation consists of:
 * @property {string} vech_type required and in ['mobil', 'motor]
 * @property {string} vech_num required and matches indo license plate
 * @property {date} in_time optional and is a date
 *
 * @param {string} method type of methods to validate
 * @returns []validations
 */
// eslint-disable-next-line consistent-return
const analyticsValidation = (method) => {
  // eslint-disable-next-line default-case
  switch (method) {
    case 'registeringParking': {
      return [
        body('vech_type').exists().isIn(['motor', 'mobil']).withMessage('Invalid vehicle type'),
        body('vech_num').exists().withMessage('Vehicle number is required').isLength({ min: 4, max: 11 })
          .withMessage('Invalid length of vehicle number')
          .matches(/^[A-Z]{1,2}\s[0-9]{1,4}\s[A-Z]{0,3}/)
          .withMessage('Invalid licesence plate')
          .custom((value) => validateVechNumUnregistered(value)),
        check('in_time').optional().isISO8601().withMessage('ISO8601 format is required')
          .custom((value) => emptyStringValidator(value))
          .toDate(),
      ];
    }
  }
};

module.exports = {
  parkingValidation,
  analyticsValidation,
};
