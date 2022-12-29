/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');
const config = require('../config/config');
const { Parking, sequelize } = require('../db/models');
const ApiError = require('../utils/ApiError');
const parkingPaymentCalculator = require('./parkingPaymentCalculator');

/**
 * @typedef {Object} ParkingData
 * @property {Date} in_time the time vehicle starts parking
 * @property {Date} out_time the time vehicle exits parking
 * @property {String} vech_type the vehicle type
 * @property {Integer} vech_num vehicle license plate
 */

/**
 * @public
 * Finds the vehicle that is still parking
 * @param {String} vechNumber
 * @returns {Promise<Parking>}
 */
const findVehicleInParking = async (vechNumber) => Parking.findOne({
  attributes: ['vech_type', 'vech_num', 'in_time', 'out_time'],
  where: {
    vech_num: vechNumber,
    out_time: null,
  },
});

/**
 * @public
 * Finds all vehicle that has been parking for more than 2 days
 * using raw query.
 * @returns {Promise<Parking[]>}
 */
const findAllParkingMoreThanTwoDays = async () => sequelize.query(`
  SELECT p.id, p.vech_num, p.vech_type, p.in_time FROM parkings AS p
  WHERE p.out_time IS NULL AND EXTRACT(DAY FROM CURRENT_TIMESTAMP - p.in_time) >= 2
  ORDER BY p.id ASC`, {
  model: Parking,
  type: QueryTypes.SELECT,
});

/**
 * @public
 * Create a new parking
 * @param {ParkingData} parkingData
 * @returns {Promise<Parking>}
 */
const newParking = async (parkingData) => {
  const t = await sequelize.transaction();

  try {
    const parked = await findVehicleInParking(parkingData.vech_num);

    if (parked) {
      throw new Error('Vehicle parked');
    }

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
 * @public
 * Unregister existing parking
 * @param {ParkingData} parkingData
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
  findAllParkingMoreThanTwoDays,
  newParking,
  unregisterParking,
};
