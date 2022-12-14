const express = require('express');
const parkingController = require('../../controllers/parking.controller');
const requestValidation = require('../../middlewares/request.validator');

const router = express.Router();

router
  .route('/in')
  .post(requestValidation.parkingValidation('registeringParking'), parkingController.registerParking);

router
  .route('/out')
  .post(requestValidation.parkingValidation('unregisterParking'), parkingController.unregisterParking);

module.exports = router;
