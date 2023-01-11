/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
const { analyticsUseCase, parkingUseCase } = require('../../../src/usecases');
const { Parking } = require('../../../src/db/models');
const config = require('../../../src/config/config');
const logger = require('../../../src/config/logger');

chai.use(chaiAsPromised);

describe('Analytics Usecase', () => {
  // Clears parked vehicles then add dummy
  // data to populate new database.
  before(async () => {
    // Clears parked data.
    await Parking.destroy({
      where: {
        out_time: null,
      },
    });

    // These variables will be used as the values in
    // in_time and out_time attributes.
    const today = new Date(new Date().toLocaleString('sv', { timeZone: config.timeZone }));
    const twoDaysBeforeToday = new Date(new Date(today - 1000 * 60 * 60 * 24 * 2)
      .toLocaleString('sv', { timeZone: config.timeZone }));

    try {
      // Register new dummy parking data
      await parkingUseCase.newParking({
        vech_type: 'mobil',
        vech_num: 'DUMMYXXX',
        in_time: twoDaysBeforeToday,
      });

      // Unregister previous dummy data
      await parkingUseCase.unregisterParking({
        vech_type: 'mobil',
        vech_num: 'DUMMYXXX',
        in_time: twoDaysBeforeToday,
        out_time: today,
      });
    } catch (err) {
      logger.error(`Populating data failed: ${err}`);
      process.exit(1);
    }
  });

  // Starts test
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
