/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
const { analyticsUseCase } = require('../../../src/usecases');
const config = require('../../../src/config/config');

chai.use(chaiAsPromised);

describe('Analytics Usecase', () => {
  describe('stat data', () => {
    it('should successfully query stat data', (done) => {
      analyticsUseCase.getParkingStatsByDate({
        startDate: new Date(new Date('2022-01-01').toLocaleString('sv', { timeZone: config.timeZone })),
        endDate: new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone })),
      }).then(([data]) => {
        data = data.dataValues;
        expect(data).to.have.property('avg_time').to.be.an('object');
        expect(data).to.have.property('avg_total').to.be.a('number');
        expect(data).to.have.property('num_of_distinct_vehicles').to.be.a('number');
        expect(data).to.have.property('highest_price').to.be.a('number');
        expect(data).to.have.property('lowest_price').to.be.a('number');
        expect(data).to.have.property('longest_time').to.be.an('object');
        expect(data).to.have.property('shortest_time').to.be.an('object');

        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});
