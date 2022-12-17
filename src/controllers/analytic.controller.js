// const httpStatus = require('http-status');
const validateRequest = require('../utils/validateRequest');
const catchAsync = require('../utils/catchAsync');

const getAnalytics = catchAsync(async (req, res) => {
  await validateRequest(req);
  res.status(200).send(req.query.start_time);
});

module.exports = { getAnalytics };
