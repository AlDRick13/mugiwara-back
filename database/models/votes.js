'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  votes.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    publication_id: {
      type: DataTypes.UUIDV4,
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
      type: DataTypes.UUIDV4,
      allowNull: false,

      //!foreigKey: true,
      //!references: {
      //!model: 'Tabla de profile',
      //!key: 'id'
      //!},
      //!onUpdate: 'CASCADE', 
      //!onDelete: 'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'votes',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['publication_id', 'profile_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    }
  });

  return votes;
};