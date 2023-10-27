'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Item.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'User ID is required',
        },
        notNull: {
          msg: 'User ID is required',
        },
      },
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Card ID is required',
        },
        notNull: {
          msg: 'Card ID is required',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Card name is required',
        },
        notNull: {
          msg: 'Card name is required',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image is required',
        },
        notNull: {
          msg: 'Image is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};