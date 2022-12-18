// const httpStatus = require('http-status');
const validateRequest = require('../utils/validateRequest');
const catchAsync = require('../utils/catchAsync');
const { analyticsUseCase } = require('../usecases');

const getAnalyticsParkingByDate = catchAsync(async (req, res) => {
  await validateRequest(req);
  const data = await analyticsUseCase.getParkingsByDate(req.query.in_time);
  res.status(200).json({
    status: 'Success retrieved data',
    data,
  });
});

module.exports = { getAnalyticsParkingByDate };
