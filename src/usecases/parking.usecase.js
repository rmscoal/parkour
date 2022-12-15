/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const config = require('../config/config');
const { Parking } = require('../db/models');
const ApiError = require('../utils/ApiError');
const parkingPaymentCalculator = require('../utils/parkingPaymentCalculator');

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
  if (!parkingData.in_time) {
    parkingData.in_time = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
  } else {
    parkingData.in_time += '+07';
  }

  return Parking.create({
    vech_type: parkingData.vech_type,
    vech_num: parkingData.vech_num,
    in_time: parkingData.in_time,
  });
};

/**
 * Unregister existing parking
 * @param {Object} parkingData
 * @returns {Promise<Parking>}
 */
const unregisterParking = async (parkingData) => {
  const car = await findVehicleInParking(parkingData.vech_num);
  if (car == null) {
    throw new ApiError(httpStatus.NOT_FOUND);
  }

  car.out_time = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
  car.total = await parkingPaymentCalculator(car.in_time, car.out_time, car.vech_type);

  await car.save();

  return car;
};

module.exports = {
  findVehicleInParking,
  newParking,
  unregisterParking,
};
