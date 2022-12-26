/* eslint-disable no-param-reassign */
const { DateTime, Interval } = require('luxon');

/**
 * @private
 * This function calibrate the time for the time object passed.
 * It identifies whether the minute is greater or equal to 1. If
 * so, it adds the number of hours by one (rounding up 1 minute
 * to 1 hour).
 *
 * For example:
 * 1 hour 1 minute => 2 hour (here we do not care about the minute
 * anymore)
 * 1 hour 53 seconds => will not add an extra hour.
 *
 * For special cases like:
 * 1 day 23 hours 1 minute => 1 day 24 hours (we do not round to
 * days from hours)
 * @param {luxon.Duration} timeObject
 * @returns {luxon.Duration}
 */
const calibrateTime = async (timeObject) => {
  if (timeObject.minutes >= 1) {
    if (timeObject.minutes >= 15 && timeObject.hours === 0) {
      timeObject.hours += 1;
      return timeObject;
    }

    if (timeObject.hours >= 1) {
      timeObject.hours += 1;
    }
  }

  return timeObject;
};

/**
 * This function calculates the price vehicles has to pay for parking
 * based on the time in starts parking and the time it exits. For a
 * vehicle of type 'mobil' the price per hour is 5000 and of type
 * 'motor' is 2000. Price per hour are rounded up by 1 minute.
 *
 * If the vehicle stays for a day or more, the price per day for vehicle
 * of type 'mobil' is 80000 and of type 'motor' is 40000. Price per day
 * is not rounded up by hour.
 * @param {Object<DateTime>} inTime the time the vechicle enters the parking lot
 * @param {Object<DateTime>} outTime the time the vehicle exits the parking lot
 * @param {Objectt<String>} vechType the type of the vehicle
 * @returns {Integer}
 */
const parkingPaymentCalculator = async ({
  inTime,
  outTime,
  vechType,
}) => {
  const dateIn = DateTime.fromISO(inTime.toISOString());
  const dateOut = DateTime.fromISO(outTime.toISOString());

  const i = Interval.fromDateTimes(dateIn, dateOut);
  let intervalObject = i.toDuration(['days', 'hours', 'minutes', 'seconds']).toObject();

  intervalObject = await calibrateTime(intervalObject);

  let total = 0;

  switch (vechType) {
    case 'mobil': {
      total += intervalObject.days * 80000;
      total += intervalObject.hours * 5000;
      break;
    }
    case 'motor': {
      total += intervalObject.days * 40000;
      total += intervalObject.hours * 2000;
      break;
    }

    default: {
      total = undefined;
    }
  }

  return total;
};

module.exports = parkingPaymentCalculator;
