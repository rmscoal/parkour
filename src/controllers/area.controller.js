const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { areaUseCase } = require('../usecases');

/**
 * Hierarchical structure:
 * Province > City > District > Village
 */

/**
 * Finds all province.
 */
const getAllProvince = catchAsync(async (_req, res) => {
  const data = await areaUseCase.findAllProvince();
  res.status(httpStatus.OK).json({
    message: 'Success retrieved data',
    data,
  });
});

/**
 * Finds all cities with given province id.
 */
const getAllCitiesWithProvinceId = catchAsync(async (req, res) => {
  const data = await areaUseCase.findCitiesWithProvinceId(req.params.id);
  res.status(httpStatus.OK).json({
    message: 'Success retrieved data',
    data,
  });
});

/**
 * Finds all districts with given city id.
 */
const getAllDistrictsWithCityId = catchAsync(async (req, res) => {
  const data = await areaUseCase.findDistrictsWithCityId(req.params.id);
  res.status(httpStatus.OK).json({
    message: 'Success retrieved data',
    data,
  });
});

/**
 * Finds all villages with given district id.
 */
const getAllVillagesWithDistrictId = catchAsync(async (req, res) => {
  const data = await areaUseCase.findVillagesWithDistrictId(req.params.id);
  res.status(httpStatus.OK).json({
    message: 'Success retrieved data',
    data,
  });
});

module.exports = {
  getAllProvince,
  getAllCitiesWithProvinceId,
  getAllDistrictsWithCityId,
  getAllVillagesWithDistrictId,
};
