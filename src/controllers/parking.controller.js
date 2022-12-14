const httpStatus = require('http-status');
const validateRequest = require('../utils/validateRequest');
const catchAsync = require('../utils/catchAsync');
const { parkingUseCase } = require('../usecases');

const registerParking = catchAsync(async (req, res) => {
  await validateRequest(req, res);
  const data = await parkingUseCase.newParking(req.body);

  return res.status(httpStatus.CREATED).send(data);
});

const unregisterParking = async (req, res) => {
  await validateRequest(req, res);
  return res.status(httpStatus.OK).json({
    meessage: 'hello',
  });
};

module.exports = {
  registerParking,
  unregisterParking,
};
