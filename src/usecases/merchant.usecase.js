const {
  Merchant, AreaProvince, AreaCity, AreaDistrict, AreaVillage,
} = require('../db/models');
const pagingResponse = require('../utils/pagination/pagingResponse');
const getPagination = require('../utils/pagination/getPagination');

/**
 * Find all merchant.
 * @returns {Promise<Merchant[]>} all merchant
 */
const findAllMerchant = async ({
  page,
  size,
  url,
}) => {
  const { limit, offset } = getPagination(page, size);

  const queryData = await Merchant.findAndCountAll({
    limit,
    offset,
    // Return specific columns
    attributes: [
      'id',
      'name',
      'email',
      'address',
      'rate_data',
      'phone_num',
    ],
    include: [
      {
        model: AreaProvince,
        // Since the association uses an alias,
        // specifying the alias is a need. For
        // further info, see /models/merchants.js
        as: 'province',
        // This produces inner join.
        required: true,
        attributes: ['id', 'name'],
      },
      {
        model: AreaCity,
        // Since the association uses an alias,
        // specifying the alias is a need. For
        // further info, see /models/merchants.js
        as: 'city',
        // // This produces inner join.
        required: true,
        attributes: ['id', 'name'],
      },
      {
        model: AreaDistrict,
        // Since the association uses an alias,
        // specifying the alias is a need. For
        // further info, see /models/merchants.js
        as: 'district',
        // This produces inner join.
        required: true,
        attributes: ['id', 'name'],
      },
      {
        model: AreaVillage,
        // Since the association uses an alias,
        // specifying the alias is a need. For
        // further info, see /models/merchants.js
        as: 'village',
        // This produces inner join.
        required: true,
        attributes: ['id', 'name', 'postal_code'],
      }],
  });

  const meta = pagingResponse(queryData, page, limit, url);

  return { data: queryData.rows, meta };
};

module.exports = {
  findAllMerchant,
};
