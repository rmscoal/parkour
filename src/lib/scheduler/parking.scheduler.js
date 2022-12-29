/* eslint-disable default-param-last */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const cron = require('node-cron');
const logger = require('../../config/logger');
const { parkingUseCase } = require('../../usecases');

/**
 * @private
 * @helper
 * reduceLicensePlates return a function that will be used
 * as a callback to shorten the writing of reduce callback.
 * @param {Parking[]} data - an array of parking models
 * @returns {Function} anonymous function
 */
// eslint-disable-next-line no-use-before-define
const reduceLicensePlates = (data) => function (str, passedData = data, index) {
  if (index === 0) {
    return str.concat(passedData.vech_num);
  }

  return str.concat(', ', passedData.vech_num);
};

/**
 * @private
 * Function to find all parked vehicles that has
 * been parking for more than two days.
 */
const checkAllParkingMoreThanTwoDays = async () => {
  const queryData = await parkingUseCase.findAllParkingMoreThanTwoDays();

  // Checks whether there are any data passed.
  // If there are, send to mailer service. Else,
  // do nothing.
  //
  // TODO: Send data to mailer service.
  if (queryData?.length) {
    logger.info(`\n----------- CRON JOB -----------\n
    Job ran successfully.

    Report: Found ${queryData.length} vehicles! Sending emails now.
    License plate(s):
    ${queryData.reduce(reduceLicensePlates(queryData), '')}
    `);
  } else {
    logger.info(`\n----------- CRON JOB -----------\n
    Job ran successfully.

    Report: No vehicles detected!`);
  }
};

const parkingSchedulerTask = cron.schedule('*/30 * * * * *', () => {
  logger.info('Scheduler worked');
  checkAllParkingMoreThanTwoDays();
}, {
  scheduled: false,
  timezone: 'Asia/Jakarta',
});

module.exports = parkingSchedulerTask;
