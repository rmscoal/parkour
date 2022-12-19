const express = require('express');
const requestValidation = require('../../middlewares/request.validator');
const analyticController = require('../../controllers/analytic.controller');

const router = express.Router();

router
  .route('/all')
  .get(requestValidation.analyticsValidation(), analyticController.getAnalyticsParkingByDate);

router
  .route('/stat')
  .get(requestValidation.analyticsValidation(), analyticController.getAnalyticsParkingStatsByDate);

module.exports = router;
