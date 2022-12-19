const express = require('express');
const requestValidation = require('../../middlewares/request.validator');
const analyticController = require('../../controllers/analytic.controller');

const router = express.Router();

router
  .route('/all')
  .get(requestValidation.analyticsValidation(), analyticController.getAnalyticsParkingByDate);

module.exports = router;
