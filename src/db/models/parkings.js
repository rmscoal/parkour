/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parkings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Parkings.init({
    vech_type: DataTypes.STRING,
    vech_num: DataTypes.STRING,
    in_time: DataTypes.DATE,
    out_time: DataTypes.DATE,
    price: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Parkings',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: 'updateTimestamp',
  });
  return Parkings;
};
