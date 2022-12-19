/* eslint-disable camelcase */
// const httpStatus = require('http-status');
const validateRequest = require('../utils/validateRequest');
const catchAsync = require('../utils/catchAsync');
const { analyticsUseCase } = require('../usecases');
const config = require('../config/config');

/**
 * getAnalysisParkingByDate is a controller to get the analytics of vehicles'
 * parking session based on its start date of parking until its end with an
 * optional of the vehicles' type.
 * @param {Request} req consisting of:
 * 1. in_time - holds the start of the time vehicles started parking (required)
 * 2. out_time - holds the end of the time vehicles ended parking (optional)
 * 3. vech_type - holds the type of the vehicle it analysizes (optional)
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

  res.status(200).json({
    status: 'Success retrieved data',
    data,
  });
});

const getAnalyticsParkingStatsByDate = catchAsync(async (req, res) => {
  await validateRequest(req);
  res.status(200).json({
    status: 'Success retrieved data',
  });
});

module.exports = {
  getAnalyticsParkingByDate,
  getAnalyticsParkingStatsByDate,
};
