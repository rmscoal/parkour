const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { areaUseCase } = require('../usecases');

const getAllProvince = catchAsync(async (_req, res) => {
  const data = await areaUseCase.findAllProvince();
  res.status(httpStatus.OK).json({
    message: 'Success retrieved data',
    data,
  });
});

const getAllCitiesWithProvinceId = catchAsync(async (req, res) => {
  const data = await areaUseCase.findCitiesWithProvinceId(req.params.id);
  res.status(httpStatus.OK).json({
    message: 'Success retrieved data',
    data,
  });
});

const getAllDistrictsWithCityId = catchAsync(async (req, res) => {
  const data = await areaUseCase.findDistrictsWithCityId(req.params.id);
  res.status(httpStatus.OK).json({
    message: 'Success retrieved data',
    data,
  });
});

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
