/* eslint-disable no-unused-vars */
// const httpStatus = require('http-status');
// const config = require('../config/config');
const {
  AreaProvince, AreaCity, AreaDistrict, AreaVillage, sequelize,
} = require('../db/models');

/**
 * Finds all provinces.
 * @returns {Promise<AreaProvince[]>} an array of province
 */
const findAllProvince = async () => AreaProvince.findAll();

/**
 * Find all cities with the associated province_id.
 * @param {integer} id defines the province_id.
 * @returns {Promise<AreaCity[]>} an array of cities.
 */
const findCitiesWithProvinceId = async (id) => AreaCity.findAll({
  where: {
    province_id: id,
  },
});

/**
 * Find all districts with the associated city_id.
 * @param {integer} id defines the city_id.
 * @returns {Promise<AreaDistrict[]>} an array of distrcits.
 */
const findDistrictsWithCityId = async (id) => AreaDistrict.findAll({
  where: {
    city_id: id,
  },
});

/**
 * Find all districts with the associated district_id.
 * @param {integer} id defines the district_id.
 * @returns {Promise<AreaVillage[]>} an array of distrcits.
 */
const findVillagesWithDistrictId = async (id) => AreaVillage.findAll({
  where: {
    district_id: id,
  },
});

module.exports = {
  findAllProvince,
  findCitiesWithProvinceId,
  findDistrictsWithCityId,
  findVillagesWithDistrictId,
};
