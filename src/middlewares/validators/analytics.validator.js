const { query } = require('express-validator');

/**
 * @public
 * analyticsValidation is used to validates incoming queries
 * for parking statistical data.
 * @returns {ValidationChain}
 */
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
  query('page').optional().isInt({ min: 1 }).withMessage('page must be integer gte 1')
    .bail()
    .toInt(),
  query('size').optional().isInt({ min: 3, max: 25 }).withMessage('size must be integer gte 3')
    .bail()
    .toInt(),
];

module.exports = analyticsValidation;
