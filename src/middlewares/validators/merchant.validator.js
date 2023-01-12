const { query } = require('express-validator');

const getAllMerchant = () => [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be integer gte 1')
    .bail()
    .toInt(),
  query('size').optional().isInt({ min: 3, max: 25 }).withMessage('size must be integer gte 3')
    .bail()
    .toInt(),
];

module.exports = {
  getAllMerchant,
};
