const express = require('express');
const parkingController = require('../../controllers/parking.controller');
const { parkingValidator } = require('../../middlewares/validators');

const router = express.Router();

router
  .route('/in')
  .post(
    parkingValidator.registerParking(),
    parkingController.registerParking,
  );

router
  .route('/out')
  .post(
    parkingValidator.unregisterParking(),
    parkingController.unregisterParking,
  );

module.exports = router;
