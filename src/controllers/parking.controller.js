const httpStatus = require('http-status');
const validateRequest = require('../utils/validateRequest');
const catchAsync = require('../utils/catchAsync');
const { parkingUseCase } = require('../usecases');
const config = require('../config/config');

/**
 * @public
 * Controller to register vehicles for parking and saves
 * the time in started parking and the vehicles number.
 */
const registerParking = catchAsync(async (req, res) => {
  await validateRequest(req, res);
  const data = await parkingUseCase.newParking(req.body);

  return res.status(httpStatus.CREATED).json({
    message: 'Enjoy your parking',
    data: {
      id: data.id,
      vech_type: data.vech_type,
      vech_num: data.vech_num,
      in_time: data.in_time.toLocaleString('sv', { timeZone: config.timeZone }),
    },
  });
});

/**
 * @public
 * Controller to unregister parked vehicles and calculates
 * the parking fee to pay.
 */
const unregisterParking = catchAsync(async (req, res) => {
  await validateRequest(req, res);
  const data = await parkingUseCase.unregisterParking(req.body);
  return res.status(httpStatus.OK).json({
    meessage: 'Thank you for parking with us',
    data: {
      id: data.id,
      vech_type: data.vech_type,
      vech_num: data.vech_num,
      in_time: data.in_time.toLocaleString('sv', { timeZone: config.timeZone }),
      out_time: data.out_time.toLocaleString('sv', { timeZone: config.timeZone }),
      total: data.total,
    },
  });
});

module.exports = {
  registerParking,
  unregisterParking,
};
