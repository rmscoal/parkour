/* eslint-disable default-param-last */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const cron = require('node-cron');
const logger = require('../../config/logger');
const { parkingUseCase } = require('../../usecases');
const { Mailer } = require('../mailer');
const config = require('../../config/config');

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
  if (queryData?.length) {
    logger.info(`\n----------- CRON JOB -----------\n
    Job ran successfully.

    Report: Found ${queryData.length} vehicles! Sending emails now.
    License plate(s):
    ${queryData.reduce(reduceLicensePlates(queryData), '')}
    `);

    // Create a new mail service
    const mailer = new Mailer(config.mailer, {
      count: queryData.length,
      licensePlates: queryData.map((data) => data.vech_num),
    }, config.mailer.recipient.split(', '), 'template.v1');
    // Send the mail
    mailer.send();
  } else {
    logger.info(`\n----------- CRON JOB -----------\n
    Job ran successfully.

    Report: No vehicles detected!`);
  }
};

/**
 * @public
 * Scheduler variable that is exported.
 *
 * To run the scheduler, simply do:
 * import { variableName } from ./index;
 *
 * variableName.start();
 */
const parkingSchedulerTask = cron.schedule('0 0 * * *', () => {
  checkAllParkingMoreThanTwoDays();
}, {
  scheduled: false,
  timezone: 'Asia/Jakarta',
});

module.exports = parkingSchedulerTask;
