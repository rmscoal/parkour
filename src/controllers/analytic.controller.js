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
 * @returns {Response}
 */
const getAnalyticsParkingByDate = catchAsync(async (req, res) => {
  await validateRequest(req);

  const { in_time: startDate, vech_type: vechType } = req.query;
  let endDate;
  ({ out_time: endDate } = req.query);

  if (endDate == null) {
    endDate = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
  }

  const data = await analyticsUseCase.getParkingsByDate({
    startDate,
    endDate,
    vechType,
  });

  res.status(200).json({
    status: 'Success retrieved data',
    data,
  });
});

module.exports = { getAnalyticsParkingByDate };
