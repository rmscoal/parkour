/* eslint-disable no-unused-vars */
// const httpStatus = require('http-status');
// const config = require('../config/config');
const {
  AreaProvince, AreaCity, AreaDistrict, AreaVillage, sequelize,
} = require('../db/models');

/**
 * Find all cities with the associated province_id.
 * @param {integer} id defines the province_id.
 * @returns {Promise<AreaCity[]>} an array of cities.
 */
const findCityWithProvinceId = async (id) => AreaCity.findAll({
  where: {
    province_id: id,
  },
});

/**
 * Find all districts with the associated city_id.
 * @param {integer} id defines the city_id.
 * @returns {Promise<AreaDistrict[]>} an array of distrcits.
 */
const findDistrictWithCityId = async (id) => AreaDistrict.findAll({
  where: {
    city_id: id,
  },
});

/**
 * Find all districts with the associated district_id.
 * @param {integer} id defines the district_id.
 * @returns {Promise<AreaVillage[]>} an array of distrcits.
 */
const findVillageWithDistrictId = async (id) => AreaVillage.findAll({
  where: {
    district_id: id,
  },
});

module.exports = {
  findCityWithProvinceId,
  findDistrictWithCityId,
  findVillageWithDistrictId,
};
