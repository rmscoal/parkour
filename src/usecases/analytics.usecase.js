/* eslint-disable no-param-reassign */
const { Op, QueryTypes } = require('sequelize');
const { Parking, sequelize } = require('../db/models');
const getPagination = require('../utils/pagination/getPagination');
const pagingResponse = require('../utils/pagination/pagingResponse');

/**
 * @typedef {Object} Props
 * @property {Date} startDate the start of the in_time date analyze
 * @property {Date} endDate the end of the in_time date to analyze
 * @property {String} vechType the vehicle type
 * @property {Integer} totalY the min value to search total attribute
 * @property {Integer} totalX the max value to search total attribute
 * @property {Integer} page the number of requested page to display
 * @property {Integer} size the number of items per page to display
 */

/**
 * @typedef {Object} ParkingUseCaseObject
 * @property {Parking} data is the query objects
 * @property {pagingResponse} meta is the pagination object
 */

/**
 * getParkingsByDate finds all parking data of vehicles starting to park at the
 * given type with an optional of the vehicles type and the total price of the
 * data where x <= total <= y.
 * @param {Props} props
 * @returns {UseCaseObject}
 */
const getParkingsByDate = async ({
  startDate,
  endDate = null,
  vechType,
  totalX = 0,
  totalY = Infinity,
  size,
  page,
  url,
}) => {
  const { limit, offset } = getPagination(page, size);

  const queryData = await Parking.findAndCountAll({
    limit,
    offset,
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

  const meta = pagingResponse(queryData, page, limit, url);

  return { data: queryData.rows, meta };
};

/**
 * getParkingStatsByDate collects the statistical information of the data
 * according to its start date and end date of the in_time attribute in the
 * database.
 * @param {Props} props
 * @returns {Promise<Parking>}
 * @example
 * query
 * SELECT AVG(p.total) AS avg_total, CAST(AVG(p.out_time - p.in_time) AS TEXT) AS avg_time,
  CAST(COUNT(DISTINCT p.vech_num) AS int8) AS num_of_distinct_cars, MAX(p.total) AS highest_price,
  MIN(p.total) AS lowest_price, CAST(MAX(p.out_time - p.in_time) AS TEXT) AS longest_time,
  CAST(MIN(p.out_time - p.in_time) AS TEXT) AS shortest_time
  FROM parkings AS p
  WHERE p.in_time BETWEEN :startDate AND :endDate
  AND p.out_time IS NOT NULL
 */
const getParkingStatsByDate = async (props) => sequelize.query(`
  SELECT AVG(p.total) AS avg_total, AVG(p.out_time - p.in_time) AS avg_time,
  CAST(COUNT(DISTINCT p.vech_num) AS int8) AS num_of_distinct_cars, MAX(p.total) AS highest_price,
  MIN(p.total) AS lowest_price, MAX(p.out_time - p.in_time) AS longest_time,
  MIN(p.out_time - p.in_time) AS shortest_time
  FROM parkings AS p
  WHERE p.in_time BETWEEN :startDate AND :endDate
  AND p.out_time IS NOT NULL`, {
  model: Parking,
  replacements: { startDate: props.startDate, endDate: props.endDate },
  type: QueryTypes.SELECT,
});

module.exports = {
  getParkingsByDate,
  getParkingStatsByDate,
};
