'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('publications', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUIDV4
        },
        profile_id: {
          type: Sequelize.UUIDV4,
          allowNull: false,

          //!foreigKey: true,
          //!references: {
          //!model: 'Tabla de profile',
          //!key: 'id'
          //!},
          //!onUpdate: 'CASCADE', 
          //!onDelete: 'SET NULL'
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.TEXT
        },
        picture: {
          type: Sequelize.STRING
        },
        city_id: {
          type: Sequelize.INTEGER,
          allowNull: false,

          //!foreigKey: true,
          //!references: {
          //!model: 'Tabla de profile',
          //!key: 'id'
          //!},
          //!onUpdate: 'CASCADE', 
          //!onDelete: 'SET NULL'
        },
        img_url: {
          type: Sequelize.STRING
        },
        publication_type_id: {
          type: Sequelize.INTEGER,
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
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
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
      await queryInterface.dropTable('publications', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};