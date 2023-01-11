/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
const { parkingUseCase } = require('../../../src/usecases');
const { Parking } = require('../../../src/db/models');

chai.use(chaiAsPromised);

describe('Parking Usecase', () => {
  // Clears all parking data with out_time of null
  before(() => {
    Parking.destroy({
      where: {
        out_time: null,
      },
    });
  });

  describe('register new parking', () => {
    it('should successfully save parking', (done) => {
      parkingUseCase.newParking({
        vech_num: 'AB 3000 XX',
        vech_type: 'motor',
      }).then((parking) => {
        expect(parking).to.have.property('vech_num').to.equal('AB 3000 XX');
        expect(parking).to.have.property('vech_type').to.equal('motor');
        expect(parking).to.have.property('in_time');
        // Since parking is commited, should not be new record.
        expect(parking).to.have.property('isNewRecord').to.equal(false);

        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('find registered previous parking data', () => {
    it('should be found', (done) => {
      parkingUseCase.findVehicleInParking('AB 3000 XX').then((parking) => {
        expect(parking).to.have.property('vech_num').to.equal('AB 3000 XX');
        expect(parking).to.have.property('vech_type').to.equal('motor');
        expect(parking).to.have.property('in_time');
        expect(parking).to.have.property('out_time').to.equal(null);

        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('register parking again with previous data', () => {
    it('should throw error', () => expect(parkingUseCase.newParking({
      vech_num: 'AB 3000 XX',
      vech_type: 'motor',
    })).to.be.rejectedWith('Vehicle parked'));
  });
});
