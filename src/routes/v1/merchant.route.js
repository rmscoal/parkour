const express = require('express');
const { merchantValidator } = require('../../middlewares/validators');
const { merchantController } = require('../../controllers');

const router = express.Router();

router
  .route('')
  .get(merchantValidator.getAllMerchant(), merchantController.getAllMerchant);

module.exports = router;
