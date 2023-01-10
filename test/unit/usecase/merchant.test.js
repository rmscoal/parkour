/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
const { merchantUseCase } = require('../../../src/usecases');

chai.use(chaiAsPromised);

describe('Merchant Usecase', () => {
  describe('Get All Merchants', () => {
    it('should query all and have correct attributes', (done) => {
      merchantUseCase.findAllMerchant().then((data) => {
        expect(data).to.be.an('array');
        data.forEach((element) => {
          element = element.toJSON();
          expect(element).to.have.property('name');
          expect(element).to.have.property('email');
          expect(element).to.have.property('address');
          expect(element).to.have.property('phone_num');
          expect(element).to.have.property('rate_data');
          expect(element).to.not.have.property('createdAt');
          expect(element).to.not.have.property('updatedAt');
        });
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});
