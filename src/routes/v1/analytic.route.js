const express = require('express');
const requestValidator = require('../../middlewares/validators');
const analyticController = require('../../controllers/analytic.controller');

const router = express.Router();

router
  .route('/all')
  .get(
    requestValidator.analyticsValidator(),
    analyticController.getAnalyticsParkingByDate,
  );

router
  .route('/stat')
  .get(
    requestValidator.analyticsValidator(),
    analyticController.getAnalyticsParkingStatsByDate,
  );

module.exports = router;
