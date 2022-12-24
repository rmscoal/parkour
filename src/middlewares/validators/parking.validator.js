const { body, check } = require('express-validator');
const { parkingUseCase } = require('../../usecases');

/**
 * @private
 * emptyStringValidator validates whether the passed in data
 * is an empty string and throws new Error if it does not
 * satisfy. On the other hand, it retuns a true boolean.
 * @param {string} value
 * @returns {boolean}
 */
const emptyStringValidator = (value) => {
  if (value === '') {
    throw new Error('Either pass in_time with value or not passing in_time at all');
  }

  return true;
};

/**
 * @private
 * validateVechNumUnregistered validates whether the passed in data
 * of a vehicle license plate has been registered and still parking.
 * If there exist a vehicle with the same license plate with the value
 * passed and is still parking, then throws an Error. Otherwise, it
 * passes this validation.
 * @param {string} value vehicle's license plate (vech_num)
 * @returns {boolean}
 */
const validateVechNumUnregistered = async (value) => {
  const checkParking = await parkingUseCase.findVehicleInParking(value);
  if (checkParking == null) {
    return true;
  }

  throw new Error('Vehicle registered and has not exit');
};

/**
 * @private
 * validateVechNumIsRregistered validates whether the passed in data
 * of a vehicle license plate has been registered and still parking.
 * If there exist a vehicle with the same license plate with the value
 * passed and is still parking, then throws an Error. Otherwise, it
 * passes this validation.
 * @param {string} value vehicle's license plate (vech_num)
 * @returns {boolean}
 */
const validateVechNumIsRegistered = async (value) => {
  const checkParking = await parkingUseCase.findVehicleInParking(value);
  if (checkParking == null) {
    throw new Error('Vehicle unregistered in parking');
  }

  return true;
};

/**
 * @public
 * registerParking is used to check incoming body request
 * for registering parking using express-validator.
 * @returns {ValidationChain}
 */
const registerParking = () => [
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

/**
 * @public
 * unregisterParking is used to check incoming body request
 * for unregistering parking using express-validator.
 * @returns {ValidationChain}
 */
const unregisterParking = () => [
  body('vech_num').exists().withMessage('Vehicle number is required').isLength({ min: 4, max: 11 })
    .withMessage('Invalid length of vehicle number')
    .matches(/^[A-Z]{1,2}\s[0-9]{1,4}\s[A-Z]{0,3}/)
    .withMessage('Invalid licesence plate')
    .custom((value) => validateVechNumIsRegistered(value)),
];

module.exports = {
  registerParking,
  unregisterParking,
};
