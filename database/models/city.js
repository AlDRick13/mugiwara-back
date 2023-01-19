'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  city.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    state_id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'city',
    tableName: 'cities',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'name']
      },
      no_foreignKey: {
        attributes: { exclude: ['country_id'] }
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      }
    }
  });
  return city;
};