/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const config = require('../config/config');
const { Parking, sequelize } = require('../db/models');
const ApiError = require('../utils/ApiError');
const parkingPaymentCalculator = require('./parkingPaymentCalculator');

/**
 * Finds the vehicle that is still parking
 * @param {String} vechNumber
 * @returns {Promise<Parking>}
 */
const findVehicleInParking = async (vechNumber) => Parking.findOne({
  where: {
    vech_num: vechNumber,
    out_time: null,
  },
});

/**
 * Create a new parking
 * @param {Object} parkingData
 * @returns {Promise<Parking>}
 */
const newParking = async (parkingData) => {
  const t = await sequelize.transaction();

  try {
    if (!parkingData.in_time) {
      parkingData.in_time = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
    } else {
      parkingData.in_time += '+07';
    }

    const parking = await Parking.create({
      vech_type: parkingData.vech_type,
      vech_num: parkingData.vech_num,
      in_time: parkingData.in_time,
    }, { transaction: t });

    await t.commit();
    return parking;
  } catch (err) {
    await t.rollback();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Transaction problem: ${err}`);
  }
};

/**
 * Unregister existing parking
 * @param {Object} parkingData
 * @returns {Promise<Parking>}
 */
const unregisterParking = async (parkingData) => {
  const t = await sequelize.transaction();

  try {
    const car = await findVehicleInParking(parkingData.vech_num);

    if (car == null) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
    }

    car.out_time = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
    car.total = await parkingPaymentCalculator({
      inTime: car.in_time,
      outTime: car.out_time,
      vechType: car.vech_type,
    });

    await car.save({ transaction: t });
    await t.commit();

    return car;
  } catch (err) {
    await t.rollback();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Transaction problem: ${err}`);
  }
};

module.exports = {
  findVehicleInParking,
  newParking,
  unregisterParking,
};
