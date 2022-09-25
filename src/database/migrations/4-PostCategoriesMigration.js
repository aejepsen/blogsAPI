'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpadate: 'CASCADE',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpadate: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
        },
      }
    })},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};
