/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
const { areaUseCase } = require('../../../src/usecases');

chai.use(chaiAsPromised);

describe('Area Usecases', () => {
  describe('Find all cities with given province id', () => {
    it('Should returned the correct cities', (done) => {
      areaUseCase.findCityWithProvinceId(1).then((data) => {
        data.forEach((city) => {
          expect(city.province_id).equal(1, 'Should have province_id === 1');
        });
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('Find all districts with given city id', () => {
    it('Should returned the correct districts', (done) => {
      areaUseCase.findDistrictWithCityId(1).then((data) => {
        data.forEach((district) => {
          expect(district.city_id).equal(1, 'Should have city_id === 1');
        });
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('Find all villages with given district id', () => {
    it('Should returned the correct villages', (done) => {
      areaUseCase.findVillageWithDistrictId(1).then((data) => {
        data.forEach((village) => {
          expect(village.district_id).equal(1, 'Should have district_id === 1');
        });
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});
