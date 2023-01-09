/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AreaVillage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AreaDistrict, {
        foreignKey: 'district_id',
      });
    }
  }
  AreaVillage.init({
    name: DataTypes.STRING,
    district_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'AreaDistrict',
        key: 'id',
      },
    },
    postal_code: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'AreaVillage',
    tableName: 'area_villages',
    schema: 'public',
  });
  return AreaVillage;
};
