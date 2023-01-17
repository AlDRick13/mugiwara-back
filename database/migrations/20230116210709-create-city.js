'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('cities', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        country_id: {
          type: Sequelize.INTEGER,
          allowNull: false,

          /* Discutir con Aldo y esperar a que haga merge del modelo Contruies
          //!foreigKey: true,
          //!references: {
            //!model: 'Tabla de paises',
            //!key: 'id'
          //!},
          //!onUpdate: 'CASCADE', 
          //!onDelete: 'SET NULL'
          */
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
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

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }

  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('cities', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}