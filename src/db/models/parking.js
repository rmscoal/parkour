/* eslint-disable no-unused-vars */
/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parking.init({
    vech_type: DataTypes.STRING,
    vech_num: DataTypes.STRING,
    in_time: DataTypes.DATE,
    out_time: DataTypes.DATE,
    total: DataTypes.FLOAT,
  }, {
    sequelize,
    tableName: 'parkings',
    modelName: 'Parking',
  });
  return Parking;
};
