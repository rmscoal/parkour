/* eslint-disable no-param-reassign */
const config = require('../config/config');
const { parking } = require('../db/models');

/**
 * Create a new parking
 * @param {Object} parkingData
 * @returns {Promise<parking>}
 */

const newParking = async (parkingData) => {
  if (!parkingData.in_time) {
    parkingData.in_time = new Date(new Date().toLocaleString('en', { timeZone: config.timeZone }));
  }

  return parking.create({
    vech_type: parkingData.vech_type,
    vech_num: parkingData.vech_num,
    in_time: parkingData.in_time,
  });
};

module.exports = { newParking };
