/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
'use strict';
const {
  Model,
  Deferrable,
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
        as: 'province',
      });
      this.belongsTo(models.AreaCity, {
        foreignKey: 'city_id',
        as: 'city',
      });
      this.belongsTo(models.AreaDistrict, {
        foreignKey: 'district_id',
        as: 'district',
      });
      this.belongsTo(models.AreaVillage, {
        foreignKey: 'village_id',
        as: 'village',
      });
    }
  }
  Merchant.init({
    name: DataTypes.STRING,
    province_id: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'area_provinces',

        // This is the column name of the referenced model
        key: 'id',

        // With PostgreSQL, it is optionally possible to declare when
        // to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_DEFERRED,
        // Options:
        // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign
        //    key constraints
        // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint
        //    check to the end of a transaction
        // - `Deferrable.NOT` - Don't defer the checks at all (default) - This
        //    won't allow you to dynamically change the rule in a transaction
      },
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'area_cities',
        deferrable: Deferrable.INITIALLY_DEFERRED,
        key: 'id',
      },
    },
    district_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'area_districts',
        deferrable: Deferrable.INITIALLY_DEFERRED,
        key: 'id',
      },
    },
    village_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'area_villages',
        deferrable: Deferrable.INITIALLY_DEFERRED,
        key: 'id',
      },
    },
    address: DataTypes.TEXT,
    rate_data: {
      type: DataTypes.JSONB,
      comment: 'Stores the rate of parking in a json format',
    },
    phone_num: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  }, {
    sequelize,
    modelName: 'Merchant',
    tableName: 'merchants',
    schema: 'parkour',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
      // Creates a gin index on data with the jsonb_path_ops operator
      {
        fields: ['data'],
        using: 'gin',
        operator: 'jsonb_path_ops',
      },
    ],
  });
  return Merchant;
};
