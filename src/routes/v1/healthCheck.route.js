const express = require('express');
const healthCheckController = require('../../controllers/healthCheck.controller');

const router = express.Router();

router
  .route('')
  .get(healthCheckController);

module.exports = router;
