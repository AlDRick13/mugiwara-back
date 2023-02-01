'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publication_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  publication_tag.init({
    tag_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,

      foreigKey: true,
      references: {
        model: 'tags',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },

    publication_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,

      foreigKey: true,
      references: {
        model: 'publications',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'publication_tag',
    tableName: 'publication_tags',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['id', 'tag_id', 'publication_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return publication_tag;
};