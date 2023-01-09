/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AreaDistrict extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AreaCity, {
        foreignKey: 'city_id',
      });
      this.hasMany(models.AreaVillage, {
        foreignKey: 'district_id',
      });
    }
  }
  AreaDistrict.init({
    name: DataTypes.STRING,
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'AreaCity',
        key: 'id',
      },
    },
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'AreaDistrict',
    tableName: 'area_districts',
    schema: 'public',
  });
  return AreaDistrict;
};
