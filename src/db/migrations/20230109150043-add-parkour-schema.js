async function up({ context: queryInterface }) {
  await queryInterface.createSchema('parkour');
}

async function down({ context: queryInterface }) {
  await queryInterface.dropSchema('parkour');
}

module.exports = { up, down };
