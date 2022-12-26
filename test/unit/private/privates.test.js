/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

/**
 * @private
 * Turn integer to string rupiah format
 * @param {Integer} value
 * @returns {String}
 * @example
 * 1000 -> "Rp. 1000.00"
 *
 * Available on analytic.controller.js
 */
const toRP = (value) => ''.concat('Rp. ', value.toFixed(2));

/**
 * @private
 * Turn PostgresInterval to string format
 * @param {Object} obj
 * @returns {String}
 * @example
 * {
 *  hours: 9,
 *  minutes: 2,
 * } -> "9 hours 2 minutes"
 *
 * Available on analytic.controller.js
 */
const toTimeReadableFormat = (obj) => {
  const noDisplayKey = 'milliseconds';
  let str = '';
  Object.keys(obj).forEach((value, index) => {
    if (value !== noDisplayKey) {
      if (index === 0) {
        str += `${obj[value]} ${value}`;
      } else {
        str += ` ${obj[value]} ${value}`;
      }
    }
  });

  return str;
};

const chai = require('chai');

const { expect } = chai;

describe('Private functions test', () => {
  describe('integer to Rp format', () => {
    it('should display 1000 to Rp. 1000.00', () => {
      const result = toRP(1000);

      expect(result).to.be.a('string');
      expect(result).to.equal('Rp. 1000.00');
    });
  });

  describe('to readable time format from object', () => {
    it('should display as 1 hours 1 minutes 1 seconds', () => {
      const obj = {
        hours: 1,
        minutes: 1,
        seconds: 1,
      };

      const result = toTimeReadableFormat(obj);

      expect(result).to.be.a('string');
      expect(result).to.equal('1 hours 1 minutes 1 seconds');
    });
  });
});
