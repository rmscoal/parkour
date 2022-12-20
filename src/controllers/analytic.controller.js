/* eslint-disable camelcase */
const httpStatus = require('http-status');
const validateRequest = require('../utils/validateRequest');
const catchAsync = require('../utils/catchAsync');
const { analyticsUseCase } = require('../usecases');
const config = require('../config/config');

/**
 * @private
 * Turn integer to string rupiah format
 * @param {Integer} value
 * @returns {String}
 */
const toRP = (value) => ''.concat('Rp. ', value.toFixed(2));

/**
 * @private
 * Turn PostgresInterval to string format
 * @param {Object} obj
 * @returns {String}
 */
const toTimeFormat = (obj) => {
  const noDisplayKey = 'milliseconds';
  let str = '';
  Object.keys(obj).forEach((value, index) => {
    if (value !== noDisplayKey) {
      if (index === 0) {
        str += `${obj[value]} ${value}`;
      } else {
        str += ` ${obj[value]} ${value}`;
      }
    }
  });

  return str;
  // return Object.keys(obj).reduce((str, v) => str.concat(obj[v].toFixed(0), ' ', v, ' '), '');
};

/**
 * @public
 * getAnalysisParkingByDate is a controller to get the analytics of vehicles'
 * parking session based on its start date of parking until its end with an
 * optional of the vehicles' type.
 * @param {Request} req consisting of:
 * 1. in_time - holds the start of the time vehicles started parking (required)
 * 2. out_time - holds the end of the time vehicles ended parking (optional)
 * 3. vech_type - holds the type of the vehicle it analysizes (optional)
 * 4. total_x - holds the start of the total price to query (optional)
 * 5. total_y - holds the end of the total price to query (optional)
 * @param {Response} res
 * @returns {Response}
 */
const getAnalyticsParkingByDate = catchAsync(async (req, res) => {
  await validateRequest(req);

  const { in_time: startDate, vech_type: vechType } = req.query;
  let endDate;
  let totalY;
  let totalX;
  ({ out_time: endDate, total_x: totalX, total_y: totalY } = req.query);

  if (!endDate) {
    endDate = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
  }

  if (totalX == null || totalX === undefined) {
    totalX = undefined;
    totalY = undefined;
  }

  const data = await analyticsUseCase.getParkingsByDate({
    startDate,
    endDate,
    vechType,
    totalX,
    totalY,
  });

  res.status(httpStatus.OK).json({
    status: 'Success retrieved data',
    data,
  });
});

const getAnalyticsParkingStatsByDate = catchAsync(async (req, res) => {
  await validateRequest(req);
  const { in_time: startDate } = req.query;
  let endDate;
  ({ out_time: endDate } = req.query);

  if (!endDate) {
    endDate = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
  }

  let [data] = await analyticsUseCase.getParkingStatsByDate({
    startDate,
    endDate,
  });
  data = data.toJSON();

  res.status(httpStatus.OK).json({
    status: 'Success retrieved data',
    data: {
      avg_total: toRP(data.avg_total),
      avg_time: toTimeFormat(data.avg_time),
      num_of_distinct_cars: data.num_of_distinct_cars,
      highest_price: toRP(data.highest_price),
      lowest_price: toRP(data.lowest_price),
      longest_parking_time: toTimeFormat(data.longest_time),
      shortest_parking_time: toTimeFormat(data.shortest_time),
    },
    // data,
    startDate: startDate.toLocaleString('sv', { timeZone: config.timeZone }),
    endDate: endDate.toLocaleString('sv', { timeZone: config.timeZone }).split(' ')[0],
  });
});

module.exports = {
  getAnalyticsParkingByDate,
  getAnalyticsParkingStatsByDate,
};
