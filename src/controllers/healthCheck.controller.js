const httpStatus = require('http-status');

const healthCheck = async (_req, res) => {
  res.status(httpStatus.OK).json({
    status: 'Ready to use',
    time: new Date(Date.now()).toString(),
  });
};

module.exports = healthCheck;
