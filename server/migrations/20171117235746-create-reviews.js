'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      review: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      score_overall: {
        type: Sequelize.INTEGER
      },
      score_transparency: {
        type: Sequelize.INTEGER
      },
      score_governance: {
        type: Sequelize.INTEGER
      },
      score_legal: {
        type: Sequelize.INTEGER
      },
      score_functionality: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tokenId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tokens',
          key: 'id',
        },
      },
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Reviews'),
};