const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('merchants', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    province_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'area_provinces',
          schema: 'public',
        },
        key: 'id',
      },
    },
    city_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'area_cities',
          schema: 'public',
        },
        key: 'id',
      },
    },
    district_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'area_districts',
          schema: 'public',
        },
        key: 'id',
      },
    },
    village_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'area_villages',
          schema: 'public',
        },
        key: 'id',
      },
    },
    address: {
      type: Sequelize.TEXT,
    },
    rate_data: {
      type: Sequelize.JSONB,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    schema: 'parkour',
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('merchants', {
    schema: 'parkour',
  });
}

module.exports = { up, down };
