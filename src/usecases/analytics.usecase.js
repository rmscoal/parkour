/* eslint-disable no-param-reassign */
const { Op } = require('sequelize');
const { Parking } = require('../db/models');

/**
 * getParkingsByDate finds all parking data of vehicles starting to park at the
 * given type with an optional of the vehicles type.
 * @param {DateTime} startDate
 * @param {DateTime} endDate
 * @returns {Promise<Parking>}
 */
const getParkingsByDate = async ({ startDate, endDate = null, vechType }) => Parking.findAll({
  where: {
    in_time: {
      [Op.and]: {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      },
    },
    out_time: {
      [Op.not]: null,
    },
    [Op.and]: [vechType && { vech_type: vechType }],
  },
});

module.exports = {
  getParkingsByDate,
};
