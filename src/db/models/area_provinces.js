/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AreaProvince extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.AreaCity, {
        foreignKey: 'province_id',
      });
    }
  }
  AreaProvince.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'AreaProvince',
    tableName: 'area_provinces',
    schema: 'public',
  });
  return AreaProvince;
};
