'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('votes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        publication_id: {
          type: Sequelize.UUID,
          allowNull: false,

          //!foreigKey: true,
          //!references: {
          //!model: 'Tabla de publication',
          //!key: 'id'
          //!},
          //!onUpdate: 'CASCADE', 
          //!onDelete: 'SET NULL'
        },
        profile_id: {
          type: Sequelize.UUID,
          allowNull: false,

          //!foreigKey: true,
          //!references: {
          //!model: 'Tabla de profile',
          //!key: 'id'
          //!},
          //!onUpdate: 'CASCADE', 
          //!onDelete: 'SET NULL'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('votes', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};