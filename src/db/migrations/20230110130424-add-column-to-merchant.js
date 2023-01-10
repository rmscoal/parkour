/**
 * Use raw query to do this because there are
 * no options to add column to an existing table
 * with specific schema.
 */

async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.sequelize.query(`
    ALTER TABLE "parkour"."merchants" ADD COLUMN "phone_num" VARCHAR(100) DEFAULT NULL;
    `, {
      transaction: t,
    }),
    queryInterface.sequelize.query(`
    ALTER TABLE "parkour"."merchants" ADD COLUMN "email" VARCHAR(150) DEFAULT NULL;
    `, {
      transaction: t,
    }),
  ]));
}

async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.sequelize.query(`
    ALTER TABLE "parkour"."merchants" DROP COLUMN "phone_num";
    `, {
      transaction: t,
    }),
    queryInterface.sequelize.query(`
    ALTER TABLE "parkour"."merchants" DROP COLUMN "email";
    `, {
      transaction: t,
    }),
  ]));
}

module.exports = { up, down };
