/* eslint-disable no-unused-vars */
/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parkings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vech_type: {
        type: Sequelize.STRING,
      },
      vech_num: {
        type: Sequelize.STRING,
      },
      in_time: {
        type: Sequelize.DATE,
      },
      out_time: {
        type: Sequelize.DATE,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('parkings');
  },
};
