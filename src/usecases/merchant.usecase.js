const { Merchant } = require('../db/models');

/**
 * Find all merchant.
 * @returns {Promise<Merchant[]>} all merchant
 */
const findAllMerchant = async () => Merchant.findAll({
  // Return specific columns
  attributes: [
    'id',
    'name',
    'email',
    'address',
    'city_id',
    'rate_data',
    'phone_num',
    'village_id',
    'district_id',
    'province_id',
  ],
});

module.exports = {
  findAllMerchant,
};
