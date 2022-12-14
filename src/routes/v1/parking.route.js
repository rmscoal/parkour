const express = require('express');
const parkingController = require('../../controllers/parking.controller');
const requestValidation = require('../../middlewares/request.validator');

const router = express.Router();

router
  .route('/in')
  .post(requestValidation.registerParkingValidation('registeringParking'), parkingController.registerParking);

module.exports = router;
