const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // product_id cannot be null
      references: {
        model: 'product',
        key: 'id',
      },
      validate: {
        isInt: true, //  product_id is an integer
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // tag_id cannot be null
      references: {
        model: 'tag',
        key: 'id',
      },
      validate: {
        isInt: true, // Ensures that tag_id is an integer
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
