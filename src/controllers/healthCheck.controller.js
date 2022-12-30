const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

/**
 * @public
 * healthCheck is used to check whether the app is ready
 * to take application.
 */
const healthCheck = catchAsync(async (_, res) => {
  res.status(httpStatus.OK).json({
    status: 'Ready to use',
    time: new Date(Date.now()).toString(),
  });
});

module.exports = healthCheck;
