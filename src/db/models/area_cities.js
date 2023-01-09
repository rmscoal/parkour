/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AreaCity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AreaProvince, {
        foreignKey: 'province_id',
      });
      this.hasMany(models.AreaDistrict, {
        foreignKey: 'city_id',
      });
    }
  }
  AreaCity.init({
    name: DataTypes.STRING,
    province_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'AreaProvince',
        key: 'id',
      },
    },
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'AreaCity',
    tableName: 'area_cities',
    schema: 'public',
  });
  return AreaCity;
};
