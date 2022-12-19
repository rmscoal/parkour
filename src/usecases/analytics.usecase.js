/* eslint-disable no-param-reassign */
const { Op } = require('sequelize');
const { Parking } = require('../db/models');

/**
 * getParkingsByDate finds all parking data of vehicles starting to park at the
 * given type with an optional of the vehicles type and the total price of the
 * data where x <= total <= y.
 * @param {Object<DateTime>} startDate required
 * @param {Object<DateTime>} endDate default
 * @param {Object<String>} vechType optional
 * @param {Object<Integer>} totalX optional, default value is 0
 * @param {Object<Integer>} totalY optional, default value is Infinity
 * @returns {Promise<Parking>}
 */
const getParkingsByDate = async ({
  startDate,
  endDate = null,
  vechType,
  totalX = 0,
  totalY = Infinity,
}) => Parking.findAll({
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
    [Op.and]: [(totalX || totalY) && {
      total: {
        [Op.between]: [totalX, totalY],
      },
    }],
  },
});

module.exports = {
  getParkingsByDate,
};
