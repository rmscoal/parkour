/* eslint-disable no-undef */
const chai = require('chai');
const parkingPaymentCalculator = require('../../../src/usecases/parkingPaymentCalculator');

const { expect } = chai;

describe('Parking Payment Calculator', () => {
  describe('test payment calculator for mobil on 1 second parking time', () => {
    it('should return a value of 0', async () => {
      const objTest = {
        inTime: new Date('2022-12-12 07:00:00'),
        outTime: new Date('2022-12-12 07:00:01'),
        vechType: 'mobil',
      };

      const total = await parkingPaymentCalculator(objTest);

      expect(total).to.equal(0);
    });
  });

  describe('test payment calculator for mobil on 1 minute parking time', () => {
    it('should return a value of 0', async () => {
      const objTest = {
        inTime: new Date('2022-12-12 07:00:00'),
        outTime: new Date('2022-12-12 07:01:00'),
        vechType: 'mobil',
      };

      const total = await parkingPaymentCalculator(objTest);

      expect(total).to.equal(0);
    });
  });

  describe('test payment calculator for truk on 1 minute parking time', () => {
    it('should return undefined', async () => {
      const objTest = {
        inTime: new Date('2022-12-12 07:00:00'),
        outTime: new Date('2022-12-12 07:01:00'),
        vechType: 'truk',
      };

      const total = await parkingPaymentCalculator(objTest);

      expect(total).to.equal(undefined);
    });
  });

  describe('test payment calculator for mobil on 15 minute parking time', () => {
    it('should return a value of 5000', async () => {
      const objTest = {
        inTime: new Date('2022-12-12 07:00:00'),
        outTime: new Date('2022-12-12 07:15:00'),
        vechType: 'mobil',
      };

      const total = await parkingPaymentCalculator(objTest);

      expect(total).to.equal(5000);
    });
  });

  describe('test payment calculator for mobil on 1 hour, 56 seconds parking time', () => {
    it('should return a value of 5000', async () => {
      const objTest = {
        inTime: new Date('2022-12-12 07:00:00'),
        outTime: new Date('2022-12-12 08:00:56'),
        vechType: 'mobil',
      };

      const total = await parkingPaymentCalculator(objTest);

      expect(total).to.equal(5000);
    });
  });

  describe('test payment calculator for mobil on 1 hour, 1 minute parking time', () => {
    it('should return a value of 10000', async () => {
      const objTest = {
        inTime: new Date('2022-12-12 07:00:00'),
        outTime: new Date('2022-12-12 08:01:00'),
        vechType: 'mobil',
      };

      const total = await parkingPaymentCalculator(objTest);

      expect(total).to.equal(10000);
    });
  });

  describe('test payment calculator for motor on 1 hour, 1 minute parking time', () => {
    it('should return a value of 4000', async () => {
      const objTest = {
        inTime: new Date('2022-12-12 07:00:00'),
        outTime: new Date('2022-12-12 08:01:00'),
        vechType: 'motor',
      };

      const total = await parkingPaymentCalculator(objTest);

      expect(total).to.equal(4000);
    });
  });

  describe('test payment calculator for motor on 1 day, 1 hour, 1 minute parking time', () => {
    it('should return a value of 44000', async () => {
      const objTest = {
        inTime: new Date('2022-12-12 07:00:00'),
        outTime: new Date('2022-12-13 08:01:00'),
        vechType: 'motor',
      };

      const total = await parkingPaymentCalculator(objTest);

      expect(total).to.equal(44000);
    });
  });
});
