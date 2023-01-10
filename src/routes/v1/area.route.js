const express = require('express');
const { areaController } = require('../../controllers');

const router = express.Router();

router
  .route('/province')
  .get(areaController.getAllProvince);

router
  .route('/city/:id')
  .get(areaController.getAllCitiesWithProvinceId);

router
  .route('/district/:id')
  .get(areaController.getAllDistrictsWithCityId);

router
  .route('/village/:id')
  .get(areaController.getAllVillagesWithDistrictId);

module.exports = router;
