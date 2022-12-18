/* eslint-disable no-param-reassign */
const { Op } = require('sequelize');
const { Parking } = require('../db/models');
const config = require('../config/config');

const getParkingsByDate = async (startDate, endDate = null) => {
  if (endDate == null) {
    endDate = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
  }
  return Parking.findAll({
    where: {
      in_time: {
        [Op.and]: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      out_time: {
        [Op.not]: null,
      },
    },
  });
};

module.exports = {
  getParkingsByDate,
};
