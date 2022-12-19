const { body, check, query } = require('express-validator');
const { parkingUseCase } = require('../usecases');

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
  const checkParking = await parkingUseCase.findVehicleInParking(value);
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
  const checkParking = await parkingUseCase.findVehicleInParking(value);
  if (checkParking == null) {
    throw new Error('Vehicle unregistered in parking');
  }

  return true;
};

/**
 * regiesteringParkingValidation is a middleware function
 * used for validating the incoming request body accordingly
 * to its routes. The validation consists of:
 * @property {string} vech_type required and in ['mobil', 'motor]
 * @property {string} vech_num required and matches indo license plate
 * @property {DateTime} in_time optional and is a date
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
        body('vech_type').exists().bail().isIn(['motor', 'mobil'])
          .withMessage('Invalid vehicle type'),
        body('vech_num').exists().withMessage('Vehicle number is required').bail()
          .isLength({ min: 4, max: 11 })
          .withMessage('Invalid length of vehicle number')
          .bail()
          .matches(/^[A-Z]{1,2}\s[0-9]{1,4}\s[A-Z]{0,3}/)
          .withMessage('Invalid licesence plate')
          .bail()
          .custom((value) => validateVechNumUnregistered(value)),
        check('in_time').optional().isISO8601().withMessage('ISO8601 format is required')
          .bail()
          .custom((value) => emptyStringValidator(value))
          .bail()
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
 * analyticsValidation is a middleware function
 * used for validating the incoming request query param
 * to its routes. The validation consists of:
 * @property {Date} in_time of a parking in_time
 * @returns []Validations
 */
// eslint-disable-next-line consistent-return
const analyticsValidation = () => [
  query('in_time').exists().isISO8601().withMessage('ISO8601 format is required'),
  query('out_time').optional().isISO8601().withMessage('ISO8601 format is required'),
  query('vech_type').optional().isIn(['mobil', 'motor', '' || null]).withMessage('Invalid vehicle type'),
  query('total_x').optional().isInt({ min: 0 }).withMessage('Integer gte 0 required')
    .bail()
    .toInt(),
  query('total_y').optional().isInt({ min: 0 }).withMessage('Integer gte 0 required')
    .bail()
    .custom((value, { req }) => {
      if (req.total_x) {
        return value > req.total_x;
      }
      return true;
    })
    .withMessage('total_y\'s value must be greater than total_x\'s value')
    .bail()
    .toInt(),
];
module.exports = {
  parkingValidation,
  analyticsValidation,
};
