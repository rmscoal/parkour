const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { merchantUseCase } = require('../usecases');
const getURL = require('../utils/getURL');

/**
 * Get all province.
 */
const getAllMerchant = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const url = getURL(req);

  const { data, meta } = await merchantUseCase.findAllMerchant({
    page,
    size,
    url,
  });

  res.status(httpStatus.OK).json({
    message: 'Success retrieved data',
    data,
    meta,
  });
});

module.exports = {
  getAllMerchant,
};
