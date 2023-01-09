/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
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
      this.belongsTo(models.AreaCity);
      this.belongsTo(models.AreaDistrict);
      this.belongsTo(models.AreaVillage);
    }
  }
  Merchant.init({
    name: DataTypes.STRING,
    province_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'area_provinces',
        key: 'id',
      },
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'area_cities',
        key: 'id',
      },
    },
    district_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'area_district',
        key: 'id',
      },
    },
    village_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'area_villages',
        key: 'id',
      },
    },
    address: DataTypes.TEXT,
    rate_data: DataTypes.JSONB,
  }, {
    sequelize,
    modelName: 'Merchant',
    tableName: 'merchants',
    schema: 'parkour',
    timestamps: true,
    underscored: true,
  });
  return Merchant;
};
